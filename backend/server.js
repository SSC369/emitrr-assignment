const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const socketIo = require("socket.io");
const http = require("http"); // Import the http module
const cors = require("cors");

const authRoutes = require("./routes/userRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const gameRoutes = require("./routes/gameRoutes");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});
app.get("/", (req, res) => {
  res.send("API is working");
});
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use(gameRoutes);
require("./controllers/leaderboardController").handleWebSocketConnection(io);

const PORT = process.env.PORT || 3000; // Use the PORT environment variable if available

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoUri = process.env.MONGODB_CONNECTION_LINK;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to mongo Successful");
  } catch (error) {
    console.log(error.message);
  }
};

connectToMongo();
