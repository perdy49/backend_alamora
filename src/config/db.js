// /* eslint-env node */
// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// // gunakan versi promise
// const db = pool.promise();

// export default db;

import fs from "fs";
import mysql from "mysql2/promise";

async function importDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  const sql = fs.readFileSync("alamora_db.sql", "utf8");
  await connection.query(sql);

  console.log("✅ DATABASE BERHASIL DIIMPORT");
  await connection.end();
}

importDB()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ IMPORT DB GAGAL:", err);
    process.exit(1);
  });
