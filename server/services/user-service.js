import pool from "../config/database.js";
import { status } from "@grpc/grpc-js";

export const UserService = {
  async GetProfile(call, callback) {
    const userId = call.user.id;

    try {
      const result = await pool.query(
        `SELECT id, email, username, status, role, create_at, updated_at
         FROM users WHERE id = $1`,
        [userId],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: status.INTERNAL, message: err.message });
    }
  },

  async UpdateProfile(call, callback) {
    const userId = call.user.id;
    const { username } = call.request;

    try {
      const result = await pool.query(
        `UPDATE users
         SET username = $1, updated_at = NOW()
         WHERE id = $2
         RETURNING id, email, username, status, role, create_at, updated_at`,
        [username, userId],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback({ code: status.INTERNAL, message: err.message });
    }
  },

  async GetQuizHistory(call, callback) {
    const userId = call.user.id;

    try {
      const result = await pool.query(
        `SELECT qr.*
         FROM quiz_results qr
         JOIN quiz_sessions qs ON qr.quiz_session_id = qs.id
         WHERE qs.user_id = $1`,
        [userId],
      );

      callback(null, { results: result.rows });
    } catch (err) {
      callback({ code: status.INTERNAL, message: err.message });
    }
  },
};
