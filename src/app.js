import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()

app.use(cors({
    origin:ProcessingInstruction.envv.CORS_ORIGIN,
    credentials:true
}))

//form aur url se data aayega
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//static kahi bar file pdf store krna chahte ha toh public folder meh krte ha so anyone can access
app.use(express.static("public"))
app.use(cookieParser())


export { app }