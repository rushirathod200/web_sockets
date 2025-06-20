const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const user_modeule = require("./modules/users");
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

io.on("connection", (socket) => {
  socket_id = socket.id;
  socket.on("user_message", (e) => {
    socket.broadcast.emit("user_message", e);
  });
});


app.get("/", (req, res) => {
  res.render("home");
});
app.post("/chat", async (req, res) => {
  var { username, socket_id } = req.body;

  try {
    const user = new user_modeule({
      username,
      socket_id,
    });

    await user.save();
    res.render("index", { username });
  } catch (error) {
    console.error(" Error saving user:", error);
    res.status(500).send("Something went wrong.");
  }
});

server.listen(2000, () => {
  console.log("server is running");
});
