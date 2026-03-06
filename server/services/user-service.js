import pool from "../config/database.js";
import bcrypt from "bcrypt";

export const UserService = {
  // PROFILE

  async GetProfile(call, callback) {
    const { user_id } = call.request;

    try {
      const result = await pool.query(
        `SELECT id,email,username,status,role,created_at,updated_at
         FROM users
         WHERE id = $1`,
        [user_id],
      );

      if (result.rows.length === 0) {
        return callback(new Error("User not found"));
      }

      callback(null, result.rows[0]);
    } catch (err) {
      callback(err);
    }
  },

  async UpdateProfile(call, callback) {
    const { user_id, username } = call.request;

    try {
      const result = await pool.query(
        `UPDATE users
         SET username=$1, updated_at=NOW()
         WHERE id=$2
         RETURNING id,email,username,status,role,created_at,updated_at`,
        [username, user_id],
      );

      callback(null, result.rows[0]);
    } catch (err) {
      callback(err);
    }
  },

  // PASSWORD

  async ChangePassword(call, callback) {
    const { user_id, old_password, new_password } = call.request;

    try {
      const result = await pool.query(
        `SELECT password FROM users WHERE id=$1`,
        [user_id],
      );

      if (result.rows.length === 0) {
        return callback(new Error("User not found"));
      }

      const user = result.rows[0];

      const isMatch = await bcrypt.compare(old_password, user.password);

      if (!isMatch) {
        return callback(new Error("Old password incorrect"));
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

      await pool.query(`UPDATE users SET password=$1 WHERE id=$2`, [
        hashedPassword,
        user_id,
      ]);

      callback(null, {});
    } catch (err) {
      callback(err);
    }
  },

  // SUBJECT

  async GetSubjects(call, callback) {
    try {
      const result = await pool.query(
        `SELECT id,name,description FROM subjects ORDER BY name`,
      );

      callback(null, {
        subjects: result.rows,
      });
    } catch (err) {
      callback(err);
    }
  },

  async GetSubjectDetail(call, callback) {
    const { subject_id } = call.request;

    try {
      const result = await pool.query(
        `SELECT id,name,description
         FROM subjects
         WHERE id=$1`,
        [subject_id],
      );

      if (result.rows.length === 0) {
        return callback(new Error("Subject not found"));
      }

      callback(null, result.rows[0]);
    } catch (err) {
      callback(err);
    }
  },

  // QUIZ HISTORY

  async GetQuizHistory(call, callback) {
    const { user_id } = call.request;

    try {
      const result = await pool.query(
        `SELECT
            quiz_session_id,
            total_questions,
            correct_answers,
            score_percentage,
            completed_at
         FROM quiz_results
         WHERE user_id=$1
         ORDER BY completed_at DESC`,
        [user_id],
      );

      callback(null, {
        results: result.rows,
      });
    } catch (err) {
      callback(err);
    }
  },

  async GetQuizResultDetail(call, callback) {
    const { quiz_session_id } = call.request;

    try {
      const result = await pool.query(
        `SELECT
            quiz_session_id,
            total_questions,
            correct_answers,
            score_percentage,
            completed_at
         FROM quiz_results
         WHERE quiz_session_id=$1`,
        [quiz_session_id],
      );

      if (result.rows.length === 0) {
        return callback(new Error("Result not found"));
      }

      callback(null, result.rows[0]);
    } catch (err) {
      callback(err);
    }
  },

  // PROGRESS

  async SaveProgress(call, callback) {
    const { quiz_session_id, progress_data } = call.request;

    try {
      await pool.query(
        `INSERT INTO quiz_progress(quiz_session_id,progress_data,saved_at)
         VALUES($1,$2,NOW())
         ON CONFLICT (quiz_session_id)
         DO UPDATE SET
           progress_data = EXCLUDED.progress_data,
           saved_at = NOW()`,
        [quiz_session_id, progress_data],
      );

      callback(null, {});
    } catch (err) {
      callback(err);
    }
  },

  async GetSavedProgress(call, callback) {
    const { quiz_session_id } = call.request;

    try {
      const result = await pool.query(
        `SELECT progress_data,saved_at
         FROM quiz_progress
         WHERE quiz_session_id=$1`,
        [quiz_session_id],
      );

      if (result.rows.length === 0) {
        return callback(null, {
          progress_data: "",
          saved_at: "",
        });
      }

      callback(null, result.rows[0]);
    } catch (err) {
      callback(err);
    }
  },
};
