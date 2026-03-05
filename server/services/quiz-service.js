import pool from "../config/database.js";
import { status } from "@grpc/grpc-js";

export const QuizService = {
  async CreateQuizSession(call, callback) {
    const { subject_id, total_questions, time_limit_minutes, difficulty } =
      call.request;
    const userId = call.user.id;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const session = await client.query(
        `INSERT INTO quiz_sessions
         (user_id, subject_id, total_questions, time_limit_minutes,
          difficulty, expires_at)
         VALUES ($1,$2,$3,$4,$5, NOW() + ($4 || ' minutes')::interval)
         RETURNING *`,
        [userId, subject_id, total_questions, time_limit_minutes, difficulty],
      );

      const questions = await client.query(
        `SELECT id FROM questions
         WHERE subject_id = $1 AND difficulty = $2
         ORDER BY RANDOM()
         LIMIT $3`,
        [subject_id, difficulty, total_questions],
      );

      for (let i = 0; i < questions.rows.length; i++) {
        await client.query(
          `INSERT INTO quiz_questions
           (quiz_session_id, question_id, order_number)
           VALUES ($1,$2,$3)`,
          [session.rows[0].id, questions.rows[i].id, i + 1],
        );
      }

      await client.query("COMMIT");

      callback(null, {
        session_id: session.rows[0].id,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      callback({ code: status.INTERNAL, message: err.message });
    } finally {
      client.release();
    }
  },
};
