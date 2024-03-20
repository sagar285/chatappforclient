import express from "express"
import { Newchat, usersallchats,userallchat } from "../controller/Chatting.js"
import { requireUser } from "../controller/controller.js"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const ChattingRoute = express.Router()


ChattingRoute.post("/newchat",requireUser,upload.single("image"), Newchat)
ChattingRoute.post("/singleuserchats",requireUser,usersallchats)
ChattingRoute.post("/alluserchats",requireUser,userallchat)

export {ChattingRoute}