import express from "express";
import {
  createTransaction,
  getMyTransactions,
  getAllTransactions,
  updateTransactionStatus,
  deleteTransaction,
  getMyHistoryDetail
} from "../controllers/transactionController.js";

import { countTransactions } from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* USER */
router.get("/history", authMiddleware, getMyHistoryDetail);
router.post("/", authMiddleware, createTransaction);
router.get("/my", authMiddleware, getMyTransactions);
router.get("/count", authMiddleware, countTransactions);

/* ADMIN */
router.get("/", authMiddleware, getAllTransactions);
router.put("/:id", authMiddleware, updateTransactionStatus);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
