import mongoose from "mongoose";

mongoose.connect('mongodb+srv://wayseasy291:W4dkR3LRM5biYy9B@cluster0.gfvp17w.mongodb.net/chatappforclient',{
    dbName:"ChatAppForClient"
}).then((c)=>console.log(`db connnected to ${c.connection.host}`)).catch((e)=>console.log(e))