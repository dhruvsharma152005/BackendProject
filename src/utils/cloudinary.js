//server se local path jisse meh cloudinary meh daluga
//file handling

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"  //file sytem

// Configuration(this give permission for file upload varna isko kese pta kiska username)
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary=async (localFilePath)=>
{
    try{
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "auto"
            }
        )
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary ",response.url);
        return response
    }
    catch(error)
    {
        fs.unlinkSync(localFilePath)  //rermove the locally saved temporary file as the upload operation got failed
        return null
    }
}


export {uploadOnCloudinary}
