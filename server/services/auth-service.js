import { hash, compare } from "bcrypt";
import { generateAccessToken } from "../utils/jwt.js";
import pool from "../config/database.js";
import { status } from "@grpc/grpc-js";

export const AuthService = {
  async Register(call, callback) {
    const { email, username, password } = call.request;

    try {
      const hashed = await hash(password, 10);

      const result = await pool.query(
        `INSERT INTO users (email, username, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, role`,
        [email, username, hashed],
      );

      const user = result.rows[0];

      const accessToken = generateAccessToken(user);

      callback(null, {
        access_token: accessToken,
        user: { id: user.id, email, username, role: user.role },
      });
    } catch (err) {
      callback({
        code: status.INTERNAL,
        message: err.message,
      });
    }
  },
  async Login(call, callback) {
    const { email, password } = call.request;

    try {
      const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);

      if (result.rowCount === 0) {
        return callback({
          code: status.NOT_FOUND,
          message: "User not found",
        });
      }

      const user = result.rows[0];

      const valid = await compare(password, user.password_hash);
      if (!valid) {
        return callback({
          code: status.UNAUTHENTICATED,
          message: "Invalid credentials",
        });
      }

      const accessToken = generateAccessToken(user);

      callback(null, {
        access_token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
    } catch (err) {
      callback({
        code: status.INTERNAL,
        message: err.message,
      });
    }
  },
};
