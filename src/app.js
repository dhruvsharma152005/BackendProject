import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"//cookie accept and delete by server
//cors ....seeting krne deta ha cross origin ha uske liye


const app=express()
//app.use for middleware/configuration
//origin kaha se accept krege
app.use(cors({
    origin:process.envv.CORS_ORIGIN,
    credentials:true
}))

//form aur url se data aayega
app.use(express.json({limit:"16kb"}))//json accept krega
app.use(express.urlencoded({extended:true,limit:"16kb"}))//extended means object ke andar object
//static kahi bar file pdf store krna chahte ha toh public folder meh krte ha so anyone can access
app.use(express.static("public"))
app.use(cookieParser())


export { app }