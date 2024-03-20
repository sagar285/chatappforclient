import mongoose from "mongoose";

const chatschema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserSchema"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserSchema"
    },
    messages:[
        {
            text:{
                 type:String,
            },
            imgurl:{
                type:String
            },
            sender:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"UserSchema"
            },
            time:{
                type:String
            }
        }  
],
})

export const ChattingModel = mongoose.model("Chatting",chatschema)