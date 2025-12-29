import db from "../config/db.js";

// ADMIN
export const getAllEvents = () => {
  return db.query("SELECT * FROM events");
};

// USER
export const getPublicEvents = () => {
  return db.query(`
    SELECT id, title, location, price, image, type
    FROM events
    WHERE status = 'active'
  `);
};

// CREATE
export const createEvent = (data) => {
  const {
    title,
    description = null,
    location,
    price,
    image,
    type = "populer",
    status = "active"
  } = data;

  return db.query(
    `INSERT INTO events
     (title, description, location, price, image, type, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description, location, price, image, type, status]
  );
};


// UPDATE
export const updateEvent = (id, data) => {
  return db.query(
    `UPDATE events SET
     title=?,
     description=?,
     location=?,
     price=?,
     image=?,
     type=?,
     status=?
     WHERE id=?`,
    [
      data.title,
      data.description ?? null,
      data.location,
      data.price,
      data.image,
      data.type ?? "populer",
      data.status ?? "active",
      id
    ]
  );
};


// DELETE
export const deleteEvent = (id) => {
  return db.query("DELETE FROM events WHERE id=?", [id]);
};

// GET BY ID (DETAIL)
export const getEventById = (id) => {
  return db.query(
    `SELECT id, title, description, location, price, image, type
     FROM events
     WHERE id = ? AND status = 'active'`,
    [id]
  );
};

export const countEvents = () => {
  return db.query("SELECT COUNT(*) AS total FROM events");
};
