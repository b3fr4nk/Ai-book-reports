import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json);

// middleware
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.listen("3000", () => {
  console.log("Server listening on port 3000");
});

export default app;
