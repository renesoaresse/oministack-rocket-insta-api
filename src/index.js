const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect("mongodb://localhost:2020/insta", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.disable("x-powered-by");

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json());
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "resized"))
);
app.use(require("./routes"));

server.listen(3330, () => {
  console.log("Server port 3330");
});
