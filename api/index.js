import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from './routes/post.route.js';
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

// Ensure MONGO is defined in the environment variables
if (!process.env.MONGO) {
  console.error("Error: MONGO is not defined in the environment variables.");
  process.exit(1);
}

// Connect to MongoDB (removed deprecated options)
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

// Middleware and routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
