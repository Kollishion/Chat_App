import { useEffect, useState } from "react";
import io from "socket.io-client";

const baseURL = "http://localhost:5000";

const useTestSocket = () => {
  const [onlineUsers, setOnlineUser] = useState([]);
  useEffect(() => {
    const socket = io(baseURL);

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });
    socket.on("getOnlineUsers", (users) => {
      setOnlineUser(users);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => socket.close();
  }, []);
  return onlineUsers;
};

export default useTestSocket;
