const express =require('express')
const http =require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(path.resolve("./public")))



io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
  socket.on('user_message',(e)=>{
    socket.broadcast.emit('user_message',e)
    
  })
});



app.get("/",(req,res)=>{
    res.render("index")

})

server.listen(2000,()=>{
    console.log("server is running");
    
})