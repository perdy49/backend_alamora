import express from "express";
import {
  adminLogin,
  getAllUsers,
  deleteUserByAdmin
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

// CRUD USER (ADMIN)
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUserByAdmin);

export default router;
