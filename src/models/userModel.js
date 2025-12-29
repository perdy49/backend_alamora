import db from "../config/db.js";

/**
 * Ambil user berdasarkan ID
 * Dipakai untuk /users/me
 */
export const findUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, username, email, created_at FROM users WHERE id = ? LIMIT 1",
    [id]
  );

  return rows.length ? rows[0] : null;
};

export const countUsers = () => {
  return db.query("SELECT COUNT(*) AS total FROM users");
};