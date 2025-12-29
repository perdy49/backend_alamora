import db from "../config/db.js";

/**
 * CREATE TRANSACTION (USER BAYAR)
 */
export const createTransaction = (data) => {
  const { user_id, email, event_id, nominal, paid_date, metode } = data;

  return db.query(
    `
    INSERT INTO transactions
    (user_id, email, event_id, nominal, paid_date, metode)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [user_id, email, event_id, nominal, paid_date, metode]
  );
};

/**
 * GET TRANSAKSI MILIK USER (HISTORY)
 */
export const getTransactionsByUser = (user_id) => {
  return db.query(
    `
    SELECT *
    FROM transactions
    WHERE user_id = ?
    ORDER BY paid_date DESC
    `,
    [user_id]
  );
};

/**
 * GET SEMUA TRANSAKSI (ADMIN)
 */
export const getAllTransactions = () => {
  return db.query(
    `
    SELECT *
    FROM transactions
    ORDER BY paid_date DESC
    `
  );
};

/**
 * UPDATE STATUS (ADMIN: REFUND)
 */
export const updateTransactionStatus = (id, status) => {
  return db.query(
    `
    UPDATE transactions
    SET status = ?
    WHERE id = ?
    `,
    [status, id]
  );
};

/**
 * DELETE TRANSACTION (ADMIN)
 */
export const deleteTransaction = (id) => {
  return db.query(
    "DELETE FROM transactions WHERE id = ?",
    [id]
  );
};

/**
 * USER - HISTORY DETAIL (JOIN EVENTS)
 * hanya ambil field yang dibutuhkan
 */
export const getHistoryWithEvent = (user_id) => {
  return db.query(
    `
    SELECT
      t.id,
      t.nominal,
      t.status,
      e.location,
      e.type
    FROM transactions t
    JOIN events e ON t.event_id = e.id
    WHERE t.user_id = ?
    ORDER BY t.paid_date DESC
    `,
    [user_id]
  );
};

export const countTransactions = () => {
  return db.query("SELECT COUNT(*) AS total FROM transactions");
};
