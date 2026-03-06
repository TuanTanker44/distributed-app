import pool from "../config/database.js";
import { status as _status } from "@grpc/grpc-js";

export const AdminService = {
  //   USER

  async GetAllUsers(call, callback) {
    try {
      const result = await pool.query(
        `SELECT id, email, username, role, created_at, updated_at FROM users`,
      );

      callback(null, { users: result.rows });
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async UpdateUserStatus(call, callback) {
    const { user_id, status } = call.request;

    try {
      const result = await pool.query(
        `UPDATE users
         SET status=$1, updated_at=NOW()
         WHERE id=$2
         RETURNING id, username, email, role, created_at, updated_at`,
        [status, user_id],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async UpdateUserRole(call, callback) {
    const { user_id, role } = call.request;

    try {
      const result = await pool.query(
        `UPDATE users
         SET role=$1, updated_at=NOW()
         WHERE id=$2
         RETURNING id, username, email, role, created_at, updated_at`,
        [role, user_id],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async DeleteUser(call, callback) {
    const { user_id } = call.request;

    try {
      await pool.query(`DELETE FROM users WHERE id=$1`, [user_id]);

      callback(null, {
        success: true,
        message: "User deleted",
      });
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  //   SUBJECT

  async CreateSubject(call, callback) {
    const { name, description } = call.request;

    try {
      const result = await pool.query(
        `INSERT INTO subjects (name, description)
         VALUES ($1,$2)
         RETURNING *`,
        [name, description],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async GetAllSubjects(call, callback) {
    try {
      const result = await pool.query(`SELECT * FROM subjects ORDER BY id`);

      callback(null, { subjects: result.rows });
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async UpdateSubject(call, callback) {
    const { id, name, description } = call.request;

    try {
      const result = await pool.query(
        `UPDATE subjects
         SET name=$1, description=$2
         WHERE id=$3
         RETURNING *`,
        [name, description, id],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async DeleteSubject(call, callback) {
    const { subject_id } = call.request;

    try {
      await pool.query(`DELETE FROM subjects WHERE id=$1`, [subject_id]);

      callback(null, {
        success: true,
        message: "Subject deleted",
      });
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  //   QUESTION

  async CreateQuestion(call, callback) {
    const q = call.request;

    try {
      const result = await pool.query(
        `INSERT INTO questions
         (subject_id, question_text, option_a, option_b,
          option_c, option_d, correct_answer, difficulty, created_by)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         RETURNING *`,
        [
          q.subject_id,
          q.question_text,
          q.option_a,
          q.option_b,
          q.option_c,
          q.option_d,
          q.correct_answer,
          q.difficulty,
          q.created_by,
        ],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async GetAllQuestions(call, callback) {
    const { subject_id, difficulty } = call.request;

    try {
      let query = `SELECT * FROM questions WHERE 1=1`;
      const params = [];

      if (subject_id) {
        params.push(subject_id);
        query += ` AND subject_id=$${params.length}`;
      }

      if (difficulty) {
        params.push(difficulty);
        query += ` AND difficulty=$${params.length}`;
      }

      const result = await pool.query(query, params);

      callback(null, { questions: result.rows });
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async GetQuestionById(call, callback) {
    const { question_id } = call.request;

    try {
      const result = await pool.query(`SELECT * FROM questions WHERE id=$1`, [
        question_id,
      ]);

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async UpdateQuestion(call, callback) {
    const q = call.request;

    try {
      const result = await pool.query(
        `UPDATE questions
         SET subject_id=$1,
             question_text=$2,
             option_a=$3,
             option_b=$4,
             option_c=$5,
             option_d=$6,
             correct_answer=$7,
             difficulty=$8,
             updated_at=NOW(),
             version=version+1
         WHERE id=$9
         RETURNING *`,
        [
          q.subject_id,
          q.question_text,
          q.option_a,
          q.option_b,
          q.option_c,
          q.option_d,
          q.correct_answer,
          q.difficulty,
          q.id,
        ],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async DeleteQuestion(call, callback) {
    const { question_id } = call.request;

    try {
      await pool.query(`DELETE FROM questions WHERE id=$1`, [question_id]);

      callback(null, {
        success: true,
        message: "Question deleted",
      });
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },
};
