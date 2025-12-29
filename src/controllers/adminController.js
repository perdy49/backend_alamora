import db from "../config/db.js";

/* ========== LOGIN ADMIN (SUDAH ADA) ========== */
export const adminLogin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM admins WHERE email = ? AND name = ?",
      [email, name]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Admin not found or wrong name/email" });
    }

    const admin = rows[0];

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login success",
      admin
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ========== CRUD USER OLEH ADMIN ========== */

// GET /admin/users
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, username, email, created_at FROM users ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /admin/users/:id
export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
