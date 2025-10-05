import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_2,
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(
    `🔗 New connection attempt. Socket ID: ${socket.id}, User ID: ${userId}`
  );

  if (!userId || userId.trim() === "" || userId === "undefined") {
    console.log(`❌ Invalid user connection attempt. Socket ID: ${socket.id}`);
    socket.disconnect(true);
    return;
  }

  userSocketMap[userId] = socket.id;
  console.log(`✅ User connected: ${userId}, Socket ID: ${socket.id}`);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("error", (err) => {
    console.error(`❌ Socket error for user ${userId}:`, err.message);
  });

  socket.on("connect_error", (err) => {
    console.error(`❌ Connection error for user ${userId}:`, err.message);
  });

  socket.on("disconnect", () => {
    console.log(`🔌 User disconnected: ${userId}, Socket ID: ${socket.id}`);
    if (userId in userSocketMap) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
