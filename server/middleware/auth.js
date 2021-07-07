import admin from "../firebase/index.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      req.user = await admin.auth().verifyIdToken(token);
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  next();
});

export const adminCheck = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminEmail = await User.findOne({ email });

  if (adminEmail.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});
