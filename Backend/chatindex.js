const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors =require("cors")

const app = express();
app.use(cors())
const server = createServer(app);
const io = new Server(server
//   ,{
//   // cors:{
//   //   origin:"http://localhost:5173",
//   //   methods:["GET","POST"],
//   //   credentials:true
//   // }
// }
);


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on("mesaage",(data) =>{
        console.log(data);
        // io.emit("recieved-message",data) 
        // socket.broadcast.emit("recieved-message",data) 
        io.to(data.room).emit("recievedmessage",data.message) 
    })
   
    socket.on("join",(roomname)=>{
      console.log(roomname)
      socket.join(roomname)
      console.log("user joinded room",roomname)
    })

    //  socket.broadcast.emit("welcome","welcome to the server");
     socket.broadcast.emit("welcome","welcome to the server");
    //  socket.on("disconnect",()=>{
    //   console.log("User Disconnected")
    //  })

  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});