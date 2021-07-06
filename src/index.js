import express from "express";
import cors from "cors";
import Database from "./db.js"
const app = express();
app.use(cors());
app.use(express.json());
Database();

app.listen(8000, () => console.log("it listens"));