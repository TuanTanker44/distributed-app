import pool from "../config/database.js";
import { status as _status } from "@grpc/grpc-js";

export const QuizService = {
  // CREATE QUIZ SESSION
  async CreateQuiz(call, callback) {
    const {
      user_id,
      subject_id,
      difficulty,
      total_questions,
      time_limit_minutes,
    } = call.request;

    try {
      // lấy subject
      const subjectRes = await pool.query(
        `SELECT name FROM subjects WHERE id=$1`,
        [subject_id],
      );

      if (subjectRes.rowCount === 0) {
        return callback({
          code: _status.NOT_FOUND,
          message: "Subject not found",
        });
      }

      const subject_name = subjectRes.rows[0].name;

      // lấy random questions
      const questionsRes = await pool.query(
        `SELECT *
         FROM questions
         WHERE subject_id=$1 AND difficulty=$2
         ORDER BY RANDOM()
         LIMIT $3`,
        [subject_id, difficulty, total_questions],
      );

      const questions = questionsRes.rows;

      if (questions.length === 0) {
        return callback({
          code: _status.NOT_FOUND,
          message: "No questions found",
        });
      }

      const sessionRes = await pool.query(
        `INSERT INTO quiz_sessions
        (user_id, subject_id, difficulty, total_questions, time_limit_minutes, status, started_at, expires_at)
        VALUES ($1,$2,$3,$4,$5,'in_progress',NOW(), NOW() + ($5::integer * INTERVAL '1 minute'))
        RETURNING *`,
        [user_id, subject_id, difficulty, total_questions, time_limit_minutes],
      );

      const session = sessionRes.rows[0];

      // lưu questions vào session
      const values = questions
        .map((q, i) => `(${session.id}, ${q.id}, ${i + 1})`)
        .join(",");

      await pool.query(`
      INSERT INTO quiz_questions
        (quiz_session_id, question_id, order_number)
        VALUES ${values}
      `);

      const formattedQuestions = questions.map((q, index) => ({
        id: q.id,
        question_text: q.question_text,
        options: {
          A: q.option_a,
          B: q.option_b,
          C: q.option_c,
          D: q.option_d,
        },
        order_number: index + 1,
      }));

      callback(null, {
        id: session.id,
        user_id,
        subject_id,
        subject_name,
        total_questions,
        time_limit_minutes,
        difficulty,
        status: "in_progress",
        started_at: session.started_at.toISOString(),
        expires_at: session.expires_at.toISOString(),
        questions: formattedQuestions,
      });
    } catch (err) {
      callback({
        code: _status.INTERNAL,
        message: err.message,
      });
    }
  },

  // GET QUIZ SESSION
  async GetQuizSession(call, callback) {
    const { quiz_session_id, user_id } = call.request;

    try {
      const sessionRes = await pool.query(
        `SELECT qs.*, s.name as subject_name
         FROM quiz_sessions qs
         JOIN subjects s ON qs.subject_id=s.id
         WHERE qs.id=$1 AND qs.user_id=$2`,
        [quiz_session_id, user_id],
      );

      if (sessionRes.rowCount === 0) {
        return callback({
          code: _status.NOT_FOUND,
          message: "Quiz session not found",
        });
      }

      const session = sessionRes.rows[0];
      if (
        session.status === "in_progress" &&
        new Date() > new Date(session.expires_at)
      ) {
        await pool.query(
          `UPDATE quiz_sessions
          SET status='expired'
          WHERE id=$1`,
          [session.id],
        );

        session.status = "expired";
      }

      const questionsRes = await pool.query(
        `SELECT q.*, qsq.order_number, qa.user_answer, qa.is_correct
         FROM quiz_questions qsq
         JOIN questions q ON q.id=qsq.question_id
         LEFT JOIN quiz_answers qa
         ON qa.session_id=qsq.session_id
         AND qa.question_id=qsq.question_id
         WHERE qsq.quiz_session_id=$1
         ORDER BY qsq.order_number`,
        [quiz_session_id],
      );

      const questions = questionsRes.rows.map((q) => ({
        id: q.id,
        question_text: q.question_text,
        options: {
          A: q.option_a,
          B: q.option_b,
          C: q.option_c,
          D: q.option_d,
        },
        order_number: q.order_number,
        user_answer: q.user_answer || "",
        is_correct: q.is_correct || false,
      }));

      callback(null, {
        id: session.id,
        user_id: session.user_id,
        subject_id: session.subject_id,
        subject_name: session.subject_name,
        total_questions: session.total_questions,
        time_limit_minutes: session.time_limit_minutes,
        difficulty: session.difficulty,
        status: session.status,
        started_at: session.started_at.toISOString(),
        expires_at: session.expires_at.toISOString(),
        questions,
      });
    } catch (err) {
      callback({
        code: _status.INTERNAL,
        message: err.message,
      });
    }
  },

  // SUBMIT ANSWER
  async SubmitAnswer(call, callback) {
    const { quiz_session_id, user_id, question_id, answer } = call.request;

    try {
      const sessionRes = await pool.query(
        `SELECT * FROM quiz_sessions
       WHERE id=$1 AND user_id=$2`,
        [quiz_session_id, user_id],
      );

      if (sessionRes.rowCount === 0) {
        return callback({
          code: _status.NOT_FOUND,
          message: "Session not found",
        });
      }

      const session = sessionRes.rows[0];

      if (session.status === "completed") {
        return callback({
          code: _status.FAILED_PRECONDITION,
          message: "Quiz already completed",
        });
      }

      // check expiration
      if (new Date() > new Date(session.expires_at)) {
        await pool.query(
          `UPDATE quiz_sessions
         SET status='expired'
         WHERE id=$1`,
          [session.id],
        );

        return callback({
          code: _status.FAILED_PRECONDITION,
          message: "Quiz expired",
        });
      }

      // get correct answer
      const qRes = await pool.query(
        `SELECT correct_answer
       FROM questions
       WHERE id=$1`,
        [question_id],
      );

      const correct = qRes.rows[0].correct_answer;
      const isCorrect = correct === answer;

      // save answer
      await pool.query(
        `INSERT INTO quiz_answers
       (quiz_session_id, question_id, user_answer, is_correct)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (quiz_session_id, question_id)
       DO UPDATE SET user_answer=$3, is_correct=$4`,
        [quiz_session_id, question_id, answer, isCorrect],
      );

      callback(null, {
        is_correct: isCorrect,
        correct_answer: correct,
        message: "Answer submitted",
      });
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  // COMPLETE QUIZ
  async CompleteQuiz(call, callback) {
    const { quiz_session_id, user_id } = call.request;

    try {
      const stats = await pool.query(
        `SELECT
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE is_correct=true) as correct
         FROM quiz_answers
         WHERE quiz_session_id=$1`,
        [quiz_session_id],
      );

      const total = parseInt(stats.rows[0].total);
      const correct = parseInt(stats.rows[0].correct);

      const score = total === 0 ? 0 : (correct / total) * 100;

      await pool.query(
        `UPDATE quiz_sessions
         SET status='completed',
         completed_at=NOW()
         WHERE id=$1 AND user_id=$2`,
        [quiz_session_id, user_id],
      );

      await pool.query(
        `INSERT INTO quiz_results
         (quiz_session_id, total_questions, correct_answers, score_percentage, completed_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [quiz_session_id, total, correct, score],
      );

      callback(null, {
        quiz_session_id,
        total_questions: total,
        correct_answers: correct,
        score_percentage: score,
        completed_at: new Date().toISOString(),
      });
    } catch (err) {
      callback({
        code: _status.INTERNAL,
        message: err.message,
      });
    }
  },
};
