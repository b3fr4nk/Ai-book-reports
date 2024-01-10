import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import booksRouter from "./routes/books";
import reportsRouter from "./routes/reports";
import webClientRouter from "./routes/webClient";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import path from "path";

const app = express();

// middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Database
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/web", webClientRouter);
app.use("/api", [booksRouter, reportsRouter]);

app.listen("3000", () => {
  console.log("Server listening on port 3000");
});

export default app;
