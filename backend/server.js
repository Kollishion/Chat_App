import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

//Environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// List of allowed frontend URLs
const allowedOrigins = [
  (FRONTEND_URL = process.env.FRONTEND_URL || process.env.FRONTEND_URL_LOCAL),
  (FRONTEND_URL_2 =
    process.env.FRONTEND_URL_2 || process.env.FRONTEND_URL_LOCAL),
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: Origin ${origin} not allowed`), false);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes);

// Start server after DB connection
connectToMongoDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
