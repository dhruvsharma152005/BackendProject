//require('dotenv').config({path:'./env})  //one way
import dotenv from 'dotenv'
import express from "express"
//import {app} from './app.js'

import connectDB from './db/index.js';  //db import from index.js in db
const app=express()
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>
{
    app.on("error",(error)=>
    {
        console.log("Error",error);
        throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})












/*
one way

import express from "express"
const app=express()

(async ()=>{
    try {
          await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
         //listen using on
          app.on("error",(error)=>{
            console.log("error",error);
            throw error
          })
          app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.port}`)
          })
    }
    catch(error)
    {
        console.error("ERROR ",error)
        throw error
    }
})()
    */