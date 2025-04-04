//require('dotenv').config({path:'./env})  //one way
import dotenv from 'dotenv'


import connectDB from './db/index.js';  //db import from index.js in db

dotenv.config({
    path:'./env'
})

connectDB()












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