import pool from "../config/database.js";
import { status as _status } from "@grpc/grpc-js";

export const AdminService = {
  async GetAllUsers(call, callback) {
    try {
      const result = await pool.query(
        `SELECT id, email, username, status, role FROM users`,
      );

      callback(null, { users: result.rows });
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },

  async UpdateUserStatus(call, callback) {
    const { user_id, status } = call.request;

    try {
      await pool.query(`UPDATE users SET status = $1 WHERE id = $2`, [
        status,
        user_id,
      ]);

      callback(null, {});
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },
  async UpdateUserRole(call, callback) {
    const { user_id, role } = call.request;
    try {
      await pool.query(`UPDATE users SET role = $1 WHERE id = $2`, [
        role,
        user_id,
      ]);

      callback(null, {});
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },
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
          call.user.id,
        ],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: _status.INTERNAL, message: err.message });
    }
  },
};
