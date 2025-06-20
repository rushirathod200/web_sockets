const monggos = require("mongoose");
monggos
  .connect("mongodb://localhost:27017/sockets", {})
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

const userschema = monggos.Schema({
  username: String,
  socket_id: String,
});

module.exports = monggos.model("user_modeule", userschema);
