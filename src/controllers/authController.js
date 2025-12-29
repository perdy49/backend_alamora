import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    // check if email exists
    const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [
      email
    ]);
    if (rows.length)
      return res.status(400).json({ msg: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashed]
    );

    return res
      .status(201)
      .json({ msg: "User created", userId: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // UI kirim 'email' tapi isinya username OR email

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // Login bisa pakai username atau email
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1",
      [email, email]
    );

    if (!rows.length) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const user = rows[0];

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Kirim response lengkap
    return res.json({
      msg: "Login success",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
