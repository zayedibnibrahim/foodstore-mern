import dotenv from "dotenv";
dotenv.config();

// Solved
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(req);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // stack: process.env.NODE_ENV === "production" ? null : err.stack,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
