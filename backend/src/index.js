import express, { json } from "express";
import { connectDB } from "./db/dbConnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

connectDB().then(() => {
  app.listen(3001, console.log("your app is running on port 3001"));
});

import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);
