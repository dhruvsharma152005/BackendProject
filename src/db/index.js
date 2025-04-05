import mongoose from "mongoose"
import {DB_Name} from "../constants.js"

//This is an async function (it returns a Promise), meaning it will wait for MongoDB to connect before moving on.


const connectDB=async ()=>
{
    try{
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
       console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.lost}`);

    }
    catch(error)
    {
        console.log("MONGODB connection error",error);
        process.exit(1)  //forcefully stops the program because the database is critical to your app.


    }
}

export default connectDB
