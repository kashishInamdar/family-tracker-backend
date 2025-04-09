import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // We can restrict this in production
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendLocation", (data) => {
    // data: { userId, lat, lng, timestamp }
    socket.broadcast.emit("locationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
