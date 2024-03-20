import express from "express"
import { requireUser } from "../controller/controller.js"
import { addMessage, getMessages, userschats } from "../controller/Chat.js"
const chatroute = express.Router()

chatroute.post("/addmessage",requireUser,addMessage)
chatroute.post("/getmessages",requireUser,getMessages)
chatroute.post("/userschats",requireUser,userschats)


export {chatroute}