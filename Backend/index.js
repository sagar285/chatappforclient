import express from "express"
import cors from "cors"
import "./conn.js"
const port =4000
import {userRoute} from "./router/userroutes.js"
import { chatroute } from "./router/chatroutes.js"
import { ChattingRoute } from "./router/ChattingRoute.js"
import { Server} from "socket.io"
import {createServer} from "node:http"
import { Socket } from "node:dgram"
import bodyParser from "body-parser"
import 'dotenv/config.js'

const app =express();
const server= createServer(app)
const io = new Server(server)
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());
app.use(userRoute)
app.use(chatroute)
app.use(ChattingRoute)

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        console.log("userId",userId)
        onlineUsers.set(userId, socket.id);
      });
      socket.on("send-msg", (data) => {
        console.log("data",data.to)
        const sendUserSocket = onlineUsers.get(data.to);
        console.log("sendUserSocket",sendUserSocket)
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
      });
    // Socket.on("message",(data)=>{
    //     console.log(data)
    //     Socket.to(data.room).emit("recievedmessage",data.message)
    // })

})




server.listen(port,()=>{
    console.log(`Express is working on http://localhost:${port}`)
})


