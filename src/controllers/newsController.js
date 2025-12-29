import * as News from "../models/newsModel.js";

// =====================
// ADMIN - GET ALL
// =====================
export const getAllNews = async (req, res) => {
  const [rows] = await News.getAllNews();
  res.json(rows);
};

// =====================
// USER - PUBLIC
// =====================
export const getPublicNews = async (req, res) => {
  const [rows] = await News.getPublicNews();
  res.json(rows);
};

// =====================
// CREATE
// =====================
export const createNews = async (req, res) => {
  const image = req.file ? req.file.filename : null;

  await News.createNews({
    ...req.body,
    image
  });

  res.status(201).json({ message: "News berhasil ditambahkan" });
};

// =====================
// UPDATE
// =====================
export const updateNews = async (req, res) => {
  const { id } = req.params;

  const image = req.file ? req.file.filename : req.body.image;

  await News.updateNews(id, {
    ...req.body,
    image
  });

  res.json({ message: "News berhasil diupdate" });
};

// =====================
// DELETE
// =====================
export const deleteNews = async (req, res) => {
  const { id } = req.params;
  await News.deleteNews(id);
  res.json({ message: "News berhasil dihapus" });
};

// =====================
// DETAIL
// =====================
export const getNewsById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await News.getNewsById(id);
  res.json(rows[0]);
};
