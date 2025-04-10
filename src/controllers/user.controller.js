import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
//we did not export default thats why it write it like this
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async(req,res)=>
{
    // res.status(200).json
    // (
    //     {
    //         message:"all done"
    //     }
    // );

    //get user details from frontend
    //validation-not empty (empty toh nhi bhejdiya email)
    //check if user already exist:usrname,email
    //check for images,check for avtar
    //upload them to cloudinary,avatar
    //create user object--create entry in db
    //remove password and refressh tokken field from response
    //check for user creation
    //response return




    
    //get user details from frontend(this will check using postman write in json form email and pass inside raw in body)
    //this will handle data only not file so wego to routes now
    const {fullName,email,username,password}=req.body
    console.log("email: ", email);


    //validation
    //one way
    // if(fullName==="")
    // {
    //     throw new ApiError(400,"fullnaame is required")
    // }
    //for beginners use if else

    if([fullName,email,username,password].some((field)=>field?.trim()===""))
    {
        throw new ApiError(400,"all fields are required")
    }

    //user already exist or not
   const existedUser= User.findOne({
        $or:[{ email }, { username }]
    })

    if(existedUser)
    {
        throw new ApiError(409,"user with email or username")
    }


    //images avatar check
    //multer give access of file
    const avatarLocalPath=req.files?.avatar[0]?.path;   //0 means initial property
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(400,"Avatar file is required")
    }

    //upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar)
    {
        throw new ApiError(400,"Avatar file is required")
    }

    //create object
    //user is talking with database
    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()

    })
    //check user is empty or not
    //remove pass and ref token
   const createdUser=await User.findById(user._id).select(
    //kya kya nhi chahiye
    "-password -refreshToken"
   )



    //check for user creation
   if(!createdUser)
   {
    throw new ApiError(500,"Something went  wrong while registring a user")
   }


   //response return

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )



})

export {registerUser}