import { db } from "../db.js";
import dayjs from "dayjs";

export const getAllCards = (req, res) => {
  const q = "SELECT * FROM cards";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    console.log(data);
    return res.status(200).json(data);
  });
};

export const createCard = (req, res) => {
  const { front_card, back_card } = req.body;

  // Validate request body
  if (!front_card || !back_card) {
    return res
      .status(400)
      .json({ error: "Both front_card and back_card are required" });
  }

  const q = "INSERT INTO cards (front_card, back_card) VALUES (?, ?)";

  db.query(q, [front_card, back_card], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res
      .status(201)
      .json({ message: "Card created successfully", cardId: data.insertId });
  });
};

export const editLearnDate = (req, res) => {
  const { newDate } = req.body;
  const id = req.params.cardId;
  console.log(id);
  console.log(newDate);

  const q = "UPDATE cards SET learn_date = ? WHERE id = ?";

  db.query(q, [newDate, id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Card not found" });
    }

    return res.status(200).json({ message: "Learn date updated successfully" });
  });
};
export const getCardsByTodayLearnDate = (req, res) => {
  const today = new Date().toISOString().slice(0, 10); // Lấy ngày hôm nay dưới dạng 'YYYY-MM-DD'
  const sql = "SELECT * FROM cards WHERE DATE(learn_date) = ?";

  db.query(sql, [today], (err, results) => {
    if (err) {
      console.error("Error fetching cards with today's learn_date:", err);
      return res.status(500).json({ error: "Failed to fetch cards" });
    }
    res.status(200).json(results);
  });
};
export const getDataByCurrentDateTime = (req, res) => {
  const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(currentDateTime);

  const sql = "SELECT * FROM cards WHERE learn_date = ?";

  db.query(sql, [currentDateTime], (err, results) => {
    if (err) {
      console.error("Error fetching data by current date-time:", err);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
    console.log(results);
    res.status(200).json(results);
  });
};
