import * as Transaction from "../models/transactionModel.js";

/**
 * USER - BAYAR / BUAT TRANSAKSI
 */
export const createTransaction = async (req, res) => {
  try {
    const user_id = req.user.id; // dari authMiddleware
    const { email, event_id, nominal, paid_date, metode } = req.body;

    if (!email || !nominal || !paid_date || !metode) {
      return res.status(400).json({ message: "Data transaksi tidak lengkap" });
    }

    await Transaction.createTransaction({
      user_id,
      email,
      event_id,
      nominal,
      paid_date,
      metode
    });

    res.status(201).json({ message: "Transaksi berhasil disimpan" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menyimpan transaksi" });
  }
};

/**
 * USER - HISTORY TRANSAKSI
 */
export const getMyTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [rows] = await Transaction.getTransactionsByUser(user_id);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil history transaksi" });
  }
};

/**
 * ADMIN - SEMUA TRANSAKSI
 */
export const getAllTransactions = async (req, res) => {
  try {
    const [rows] = await Transaction.getAllTransactions();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data transaksi" });
  }
};

/**
 * ADMIN - UPDATE STATUS (REFUND)
 */
export const updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Transaction.updateTransactionStatus(id, status);
    res.json({ message: "Status transaksi berhasil diubah" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah status transaksi" });
  }
};

/**
 * ADMIN - DELETE TRANSAKSI (KEMBALIKAN DANA)
 */
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await Transaction.deleteTransaction(id);

    res.json({ message: "Transaksi berhasil dikembalikan" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengembalikan transaksi" });
  }
};

/**
 * USER - HISTORY DETAIL (JOIN EVENTS)
 */
export const getMyHistoryDetail = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [rows] = await Transaction.getHistoryWithEvent(user_id);
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil history detail"
    });
  }
};

export const countTransactions = async (req, res) => {
  try {
    const [rows] = await Transaction.countTransactions();
    res.json(rows[0].total);
  } catch (error) {
    res.status(500).json({ message: "Gagal hitung transaksi" });
  }
};
