// import { findUserById } from "../models/userModel.js";

// /**
//  * GET /api/users/me
//  * Ambil user dari token (req.user.id)
//  */
// export const getMe = async (req, res) => {
//   try {
//     // authMiddleware akan mengisi req.user
//     const userId = req.user.id;

//     const user = await findUserById(userId);
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     return res.json(user);
//   } catch (err) {
//     console.error("GET ME ERROR:", err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

import db from "../config/db.js";
import * as User from "../models/userModel.js";

/**
 * GET /users/me
 * Ambil data profile user yang login
 */
export const getMe = async (req, res) => {
  try {
    console.log("JWT PAYLOAD:", req.user); // ⬅️ TAMBAHKAN INI
    const userId = req.user.id;
    console.log("USER ID:", userId); // ⬅️ TAMBAHKAN INI

    const [rows] = await db.query(
      `SELECT 
        id,
        username,
        email,
        first_name,
        last_name,
        avatar
       FROM users
       WHERE id = ?`,
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /users/me
 * Update profile user
 */
export const updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { first_name, last_name, username, email, avatar } = req.body;

    await db.query(
      `UPDATE users SET
        first_name = ?,
        last_name = ?,
        username = ?,
        email = ?,
        avatar = ?
       WHERE id = ?`,
      [first_name, last_name, username, email, avatar, userId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const countUsers = async (req, res) => {
  try {
    const [rows] = await User.countUsers();
    res.json(rows[0].total);
  } catch (error) {
    res.status(500).json({ message: "Gagal hitung user" });
  }
};