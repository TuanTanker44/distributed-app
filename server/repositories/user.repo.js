import pool from "../config/database.js";

class UserRepository {
  async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  async create(user) {
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user.username, user.email, user.password_hash],
    );
    return result.rows[0];
  }
  async findAll() {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    return result.rows;
  }
}

export default new UserRepository();
