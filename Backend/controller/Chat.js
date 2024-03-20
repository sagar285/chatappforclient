import { chatmodel } from "../modal/chat.js";
import { error, success } from "../utils/response.js";

const addMessage =async(req,res)=>{
    try {
        const {from,to,message} =req.body;
        const data = await chatmodel.create({
            message:{text:message},
            users:[from,to],
            sender:from
        });
    if(data){
        return res.send(success(200,"Message added succesfully"))
    }
    else{
        return res.send(error(403,"Failed to add Messages"))
    }    
    } catch (e) {
         return res.send(error(500,e.message))
    }
}


const getMessages =async(req,res)=>{
    try {
        const {from,to}=req.body;
        const messages = await  chatmodel.find({users:{
            $all:[from,to]
        }})
        const projectedMessages = messages.map((msg) => {
            return {
              fromSelf: msg.sender.toString() === from,
              message: msg.message.text,
            };
          });
          return res.send(success(200,projectedMessages));


    } catch (e) {
        return res.send(error(500,e.message))
    }
}

const userschats =async(req,res)=>{
    try {
        const {userid}=req.body;
    
    const data = await chatmodel.find({users:userid})
    return res.send(success(200,data))
} catch (e) {
    return res.send(error(500,e.message))  
}
}

export {addMessage,getMessages,userschats}