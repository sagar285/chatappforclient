import { usermodel } from "../modal/User.js";
import { error, success } from "../utils/response.js";
import crypto from "crypto"
import jwt from "jsonwebtoken"



const generateFilename =(bytes =32)=>{
    crypto.randomBytes(bytes).toString("hex")
}

const generateAccessToken =(data)=>{
   
    try {
        const expiresInYears = 10;
const expiresInSeconds = expiresInYears * 365 * 24 * 60 * 60;
        const token= jwt.sign(data,"accessstokenprivatekeyforchatapp",{expiresIn:expiresInSeconds})
        return token;  
    } catch (e) {
        return e.message
    }
}


 const requireUser =async(req,res,next)=>{
    if(!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){
      return res.send(error(401,'Authentication header is required'))
    }
    const accessToken = req.headers.authorization.split(" ")[1]
    // console.log("accessToken",accessToken)
    try {
        const decoded =jwt.verify(accessToken,"accessstokenprivatekeyforchatapp")
        req._id =decoded._id;
        const user = await usermodel.findById(req._id)
        if(!user){
            return res.send(error(404,'User Not Found'))
        }
        next();  
    } catch (e) {
        return res.send(error(401,'Invalid access Key'))
    }
}

const isuseralreadyexist =async(req,res)=>{
    const {phone}=req.body;
    if(!phone){
        return res.send(error(400,"Phone number is mandatory"))
    }
    try {
    const isphonealreadyexist =await usermodel.findOne({phone:phone})
    if(isphonealreadyexist){
   return res.send(error(403,"User Already Exist with this number"))  
    }
    else{
        return res.send(success(200,"This is safe, you can proceed"))
    }
} catch (e) {
    return res.send(error(500,e.message))   
}
}
 const UserRegister =async(req,res)=>{
    const {phone}=req.body;
    if(!phone){
        return res.send(error(400,"Phone number is mandatory"))
    }
    try {
        const data = await usermodel.create({phone})
        if(data){
            const token =generateAccessToken({_id:data._id})
            return res.send(success(200,{data,token}))
        }
        else{
        return res.send(error(400,"User Not Registered"))
        }
    } catch (e) 
    {
        return res.send(error(500,e.message))  
    }
}

const userLogin =async(req,res)=>{
    const {phone}=req.body;
    if(!phone){
        return res.send(error(400,"Phone number is mandatory"))
    }
    try {
    const isphonealreadyexist =await usermodel.findOne({phone:phone}).populate("chatusers")
    if(isphonealreadyexist){
        const token = generateAccessToken({_id:isphonealreadyexist._id})
   return res.send(success(200,{isphonealreadyexist,token}))
    }
    else{
        const isphonealreadyexist = await usermodel.create({phone})
        if(isphonealreadyexist){
            const token =generateAccessToken({_id:isphonealreadyexist._id})
            return res.send(success(200,{isphonealreadyexist,token}))
        }
        // return res.send(success(404,"No User Found with this number"))
    }
} catch (e) {
    console.log(e)
    return res.send(500,error(500,e.message))    
}
}

 const UserUpdate =async(req,res)=>{
    const {name,title,imgurl,id}=req.body;
    const file=req.file;
    const imageName = file ? generateFilename() : imgurl ;
    const fileBuffer = file?.buffer;
     
    try {
    // yhan par photo upload ka code likhna h voh reh gya h
    const data = await usermodel.findByIdAndUpdate({_id:id},{
        name,title,img:imageName
    },{new:true})
    return res.send(success(200,data))
} catch (e) {
    return res.send(error(500,e.message))
}





 }


 const usergetallohtersuser = async(req,res)=>{
         try {
        const users = await usermodel.find({_id:{$ne:req._id}})
        return res.send(success(200,users)) 
    } catch (e) {
        return res.send(error(500,e.message))
    }
 }

 const usergetallphonenumbers =async(req,res)=>{
    
    try {
        const {numbers}=req.body;
    const data = await usermodel.find({_id:{$ne:req._id}}).select("phone")
    let newarray =[]
    // const filteredArray = numbers.filter((item) =>
    // item.phoneNumbers.map(function(phone){
    //             const phonenumebr =   phone.number.replace(/\s/g, '').replace(/^\+91/,'')
    //             newarray.push(phonenumebr)
    //   return  phone.number.replace(/\s/g, '').replace(/^\+91/,'');
    // })
    // );
    // some((phone) =>phone.number.replace(/\s/g, '')).replace(/^\+91/,'')
    // data.includes(phone.number)
    // var cleanedPhoneNumber = phoneNumber.replace(/\s/g, ''); 
    console.log(data)
    // Extract phone numbers and _id pairs from the second array
    const idPhoneMap = data.reduce((map, item) => {
        map[item.phone.toString()] = item._id;
        return map;
      }, {});
       
      // Flatten the first array and find matches
      const matchedData = numbers.reduce((result, item) => {
        let processedNumbers = new Set(); // To store already processed numbers
        item.number.forEach(num => {
          if (idPhoneMap[num] && !processedNumbers.has(num)) {
            result.push({
              done: item.done,
              name: item.name,
              number: num,
              matchedIds: idPhoneMap[num]
            });
            processedNumbers.add(num); // Add the processed number to the set
          }
        });
        return result;
      }, []);
      
      console.log(matchedData);
      
  
//   console.log(matchedData);
    // const existingSet = new Set(newarray);
    // const filtereArray = data.filter((item) => existingSet.has(item.phone.toString()))
    return res.send(success(200,matchedData))
 } catch (e) {
    console.log(e.message)
       return res.send(error(500,e.message))
    }
 } 


 export {isuseralreadyexist,UserRegister,userLogin,UserUpdate,usergetallohtersuser,requireUser,usergetallphonenumbers}



