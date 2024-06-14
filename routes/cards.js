import express from "express";
import {
  getAllCards,
  createCard,
  editLearnDate,
  getCardsByTodayLearnDate,
  getDataByCurrentDateTime,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/all-cards", getAllCards);
router.post("/create-card", createCard);
router.put("/:cardId", editLearnDate);
router.get("/learn-today", getCardsByTodayLearnDate);
router.get("/card-learn", getDataByCurrentDateTime);

export default router;
