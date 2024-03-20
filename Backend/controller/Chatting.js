import { ChattingModel } from "../modal/chats.js";
import { error, success } from "../utils/response.js";
import mongoose ,{ObjectId} from "mongoose";
import { usermodel } from "../modal/User.js";
import crypto from  "crypto"
import { uploadFile } from "../middleware/S3.js";

// const Newchat =async(req,res)=>{
//     try {
//         const {from ,to ,message}=req.body
//         if(!from || !to){
//             return res.send(error("Not Valid chat"));
//         }
      
//         let imgname;
//         const newItem = {
//             text: {},
//             imgurl: {}
//           };
//           if (message) {
//             newItem.text = message;
//           }
          
//           // Check if imgurl is not empty and assign its value to imgurl
//           if (imgname) {
//             newItem.imgurl = imgname;
//           }
          
//           // Push the new object into the array
//           array.push(newItem);
//         const isconnectionalready = await ChattingModel.findOne({$or:[{$and:[{senderId:from,receiverId:to}]},{$and:[{receiverId:from,senderId:to}]}]})
       
//               if(isconnectionalready){
//                   isconnectionalready.messages.push(newItem)
//                   return res.send(success(200,"message added succesfully"))
//               }
//               else {
//                 const newconnection = await ChattingModel.create({
//                     senderId:from,
//                     receiverId:to,
//                 })
        
//               if(newconnection){
//                   newconnection.messages.push(newItem)
//                   return res.send(success(200,"message added succesfully"))
//               }
//               else{
//                 return res.send(error(500,"something went wrong"))
//               }
//             }
        
//     } catch (e) {
//        return res.send(error(500,e.message)) 
//     }
// }

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
const Newchat = async (req, res) => {
    try {
      const { from, to, message,time } = req.body;
      const file = req.file
      console.log(req.file)
      var imgurl = "";
      if(file){
        const imageName = generateFileName()
        const fileBuffer =file.buffer;
       const data = await uploadFile(fileBuffer, imageName, file.mimetype)
       imgurl = "https://d3bjtrjgvxo65.cloudfront.net/" + imageName
      }
      const Fromuser = await usermodel.findById(from)
      if(Fromuser.chatusers[0] == null || Fromuser.chatusers.length == 0 ) {
        Fromuser.chatusers.push(to)
        await Fromuser.save()
      }
      else{
        if(!Fromuser.chatusers.includes(to)){
            Fromuser.chatusers.push(to)
        await Fromuser.save()
      
        }
      }
      const Touser = await usermodel.findById(to)
      if(Touser.chatusers.length == 0){
        Touser.chatusers.push(from)
        await Touser.save()
      }
      else{
        if(!Touser.chatusers.includes(from)){
            Touser.chatusers.push(from)
        await Touser.save()
        }
      }
      if (!from || !to) {
        return res.send(error("Not Valid chat"));
      }
  
      let imgname; // You need to assign a value to imgname
      const newItem = {
        text:"",
        imgurl:"",
        sender:from,
        time:time
      };
  
      if (message) {
        newItem.text = message;
      }
  
      // Check if imgurl is not empty and assign its value to imgurl
      if (imgurl) {
        newItem.imgurl = imgurl;
      }
  
      const isConnectionAlready = await ChattingModel.findOne({
        $or: [
          { $and: [{ senderId: from, receiverId: to }] },
          { $and: [{ receiverId: from, senderId: to }] },
        ],
      });
  
      if (isConnectionAlready) {
        isConnectionAlready.messages.push(newItem);
        await isConnectionAlready.save(); // Save the changes to the existing connection
        return res.send(success(200, "message added successfully"));
      } else {
        const newConnection = await ChattingModel.create({
          senderId: from,
          receiverId: to,
        });
  
        if (newConnection) {
          newConnection.messages.push(newItem);
          await newConnection.save(); // Save the changes to the newly created connection
          return res.send(success(200, "message added successfully"));
        } else {
          return res.send(error(500, "something went wrong"));
        }
      }
    } catch (e) {
      console.log(e)
      return res.send(error(500, e.message));
    }
  };
  


const usersallchats =async(req,res)=>{
    try {
        const {from,to} =req.body;
        const data = await ChattingModel.find({
            $or: [
              { $and: [{ senderId: from }, { receiverId: to }] },
              { $and: [{ senderId: to }, { receiverId: from }] },
            ],
          }).populate(["senderId", "receiverId"])
        return res.send(success(200,data))
    } catch (e) {
      return res.send(error(500,e.message))  
    }
}
const userallchat =async(req,res)=>{
    try {
        const {from} =req.body;
        // newObjectId = ObjectId(from)
        // console.log(newObjectId)
        // const data = await ChattingModel.find({
        //     $or: [
        //         { senderId: from },
        //         { receiverId: from }
        //       ],
        //   }).select("-messages").populate(["senderId", "receiverId"])

        const data = await usermodel.findById({_id:from}).populate("chatusers")
        return res.send(success(200,data))
    } catch (e) {
      return res.send(error(500,e.message))
    }
}

export {Newchat,usersallchats,userallchat}