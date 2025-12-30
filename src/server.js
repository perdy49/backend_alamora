/* eslint-env node */
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import db from "./config/db.js";
// import jwt from "jsonwebtoken";
// import path from "path";

// import adminRoutes from "./routes/adminRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import newsRoutes from "./routes/newsRoutes.js";
// import transactionRoutes from "./routes/transactionRoutes.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // =========================
// //     MIDDLEWARE GLOBAL
// // =========================
// app.use(
//   cors({
//     origin: true,
//     credentials: true
//   })
// );

// app.get("/", (req, res) => {
//   res.json({ status: "Backend Alamora OK 🚀" });
// });


// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // =========================
// //        ROUTES
// // =========================
// app.use("/api/admin", adminRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/events", eventRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/news", newsRoutes);
// app.use("/api/transactions", transactionRoutes);

// // =========================
// //        SERVER
// // =========================
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

/* eslint-env node */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// =========================
//     MIDDLEWARE GLOBAL
// =========================

// ✅ AMAN UNTUK VERCEL + LOCAL
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
//     STATIC FILE
// =========================
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// =========================
//     TEST ROOT
// =========================
app.get("/", (req, res) => {
  res.json({ status: "Backend Alamora OK 🚀" });
});

// =========================
//        ROUTES
// =========================
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/transactions", transactionRoutes);

// =========================
//        SERVER
// =========================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
