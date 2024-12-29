import { io } from "socket.io-client";

const baseURL = "http://localhost:5000";
let socket;

export const initializeSocket = (userId) => {
  if (!socket || !socket.connected) {
    socket = io(baseURL, { query: { userId } });
    console.log("Socket initialized with ID:", userId);
  }
  return socket;
};

export const getSocket = () => socket;
