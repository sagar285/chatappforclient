import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phone:{
        type:Number,
        required:true
    },
    name:{
        type:String
    },
    title:{
        type:String
    },
    img:{
        type:String
    },
    imgurl:{
        type:String
    },
    chatusers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSchema"
          }
    ]
})

 export const usermodel = mongoose.model("UserSchema",UserSchema)