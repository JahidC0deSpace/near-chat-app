import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/meesage.route.js";
import { connectDB } from "./lib/db.js";
import { app, io, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __direname = path.resolve();

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.SOCKET_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__direname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__direname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
  });
});
