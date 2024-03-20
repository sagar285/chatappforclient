import express from "express"
import { UserRegister, UserUpdate, isuseralreadyexist, userLogin, usergetallohtersuser,requireUser, usergetallphonenumbers } from "../controller/controller.js";

const userRoute =express.Router();

userRoute.post("/useralreadyexist",isuseralreadyexist)
userRoute.post("/userRegister",UserRegister)
userRoute.post("/userLogin",userLogin)
userRoute.put("/userUpdate",requireUser,UserUpdate)
userRoute.get("/getallothersuser",requireUser,usergetallohtersuser)
userRoute.post("/usergetallphonenumbers",requireUser,usergetallphonenumbers)
// usergetallphonenumbers

export {userRoute}