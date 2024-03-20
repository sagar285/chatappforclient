import mongoose from "mongoose";

const MessageSchema =  mongoose.Schema({
    message:{
        text:{type:String,required:true}
    },
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserSchema"
    },  
},{ timestamps: true,})

export const chatmodel = mongoose.model("Messages",MessageSchema);
