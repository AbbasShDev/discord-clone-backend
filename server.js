require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
