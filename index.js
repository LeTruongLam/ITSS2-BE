import express from "express";
import cardsRoutes from "./routes/cards.js";

import cookieParser from "cookie-parser";
import { db } from "./db.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/cards", cardsRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
