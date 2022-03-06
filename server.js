require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const socket = require("./socket");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
socket.registerSocketServer(server);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection faild");
    console.error(error);
  });
