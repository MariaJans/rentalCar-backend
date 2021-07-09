import express from "express";
import cors from "cors";
import Database from "./db.js";
const app = express();
import routesUrls from  "./routes/routes";
app.use(cors());
app.use(express.json());
app.use("/app", routesUrls)
Database();
app.listen(8000, () => console.log("server is up and running"));