import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import booksRouter from "./routes/books";
import mongoose from "mongoose";

const app = express();

// middleware
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
app.use("/api", [booksRouter]);

app.listen("3000", () => {
  console.log("Server listening on port 3000");
});

export default app;
