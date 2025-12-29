import express from "express";
import {
  getAllNews,
  getPublicNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById
} from "../controllers/newsController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// =====================
// USER
// =====================
router.get("/", getPublicNews);
router.get("/:id", getNewsById);

// =====================
// ADMIN
// =====================
router.get("/admin/all", authMiddleware, getAllNews);

router.post("/", authMiddleware, upload.single("image"), createNews);

router.put("/:id", authMiddleware, upload.single("image"), updateNews);

router.delete("/:id", authMiddleware, deleteNews);

export default router;
