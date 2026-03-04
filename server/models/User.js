import pool from "../config/database.js";

class UserModel {
  async findAll() {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    return result.rows;
  }
  async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }
  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
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
  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key in data) {
      fields.push(`${key} = $${idx}`);
      values.push(data[key]);
      idx++;
    }
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
  }
  async delete(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  }
}

export default new UserModel();
