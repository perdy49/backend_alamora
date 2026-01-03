import db from "../config/db.js";

const ADMIN_NAME = "faisal";
const ADMIN_EMAIL = "admin@alamora.com";
const ADMIN_PASSWORD = "123456"; // ← ini key code default

export const seedAdmin = async () => {
  try {
    const [rows] = await db.query("SELECT id FROM admins WHERE email = ?", [
      ADMIN_EMAIL
    ]);

    if (rows.length > 0) {
      console.log("Admin already exists");
      return;
    }

    await db.query(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD]
    );

    console.log("Admin seeded successfully");
  } catch (err) {
    console.error("Seed admin failed:", err.message);
  }
};
