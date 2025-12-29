import db from "../config/db.js";

// =====================
// ADMIN
// =====================
export const getAllNews = () => {
  return db.query("SELECT * FROM news ORDER BY created_at DESC");
};

// =====================
// USER (PUBLIC)
// =====================
export const getPublicNews = () => {
  return db.query(`
    SELECT id, title, description, image, category, year, created_at
    FROM news
    ORDER BY created_at DESC
  `);
};

// =====================
// CREATE
// =====================
export const createNews = (data) => {
  const { title, description, image, category = "lokal", year } = data;

  return db.query(
    `INSERT INTO news
     (title, description, image, category, year)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, image, category, year]
  );
};

// =====================
// UPDATE
// =====================
export const updateNews = (id, data) => {
  return db.query(
    `UPDATE news SET
      title = ?,
      description = ?,
      image = ?,
      category = ?,
      year = ?
     WHERE id = ?`,
    [data.title, data.description, data.image, data.category, data.year, id]
  );
};

// =====================
// DELETE
// =====================
export const deleteNews = (id) => {
  return db.query("DELETE FROM news WHERE id = ?", [id]);
};

// =====================
// GET BY ID
// =====================
export const getNewsById = (id) => {
  return db.query(
    `SELECT id, title, description, image, category, year, created_at
     FROM news
     WHERE id = ?`,
    [id]
  );
};
