import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4200;

connectDB();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("API is running....");
});

// routes middleware -auto load

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, console.log("Server running at 4200".yellow.bold));
