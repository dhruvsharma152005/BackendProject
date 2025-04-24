import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
//we did not export default thats why it write it like this
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//access and refresh token method(we did not need async handler we didnot handle webrequest)
const generateAccessAndRefreshTokens = async(userId)=>
{
    try
    {
        const user=await User.findById(userId)
        const acccessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken() 

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})  //save in database

        return{acccessToken,refreshToken}

    }
    catch(error)
    {
        throw new ApiError(500,"Sonething went wrong while generating tokens")
    }
}

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
    const { fullName,email,password,username}=req.body;
    //console.log("email: ", email);


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
   const existedUser= await User.findOne({
        $or:[{ username }, { email }]
    })

    if(existedUser)
    {
        throw new ApiError(409,"user with email or username is already exist")
    }
  //  console.log(req.files);


    //images avatar check
    //multer give access of file
    const avatarLocalPath=req.files?.avatar[0]?.path;   //0 means initial property  /?means ha true ha toh avtar ha
    //const coverImageLocalPath=req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0)
    {
        coverImageLocalPath = req.files.coverImage[0].path
    }


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

const loginUser=asyncHandler(async(req,res)=>
    {
        //get data from req.body
        //username or email
        //find the user
        //password check
        //acccess and referesh token
        //send cookies



        //get dta kaha se req.body se
        const {username,email,password}=req.body

        if(!username && !email)
        {
            throw new ApiError(400,"usename or email is required")
        }


        //find user ya toh usernmae ya toh email
        const user=await User.findOne({
            $or:[{username:username.toLowerCase()},{email:email.toLowerCase()}],
        })

        if(!user)
        {
            throw new ApiError(404,"User doesnot exist")
        }


        //pass check
        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid)
        {
            throw new ApiError(401,"Invalid user credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        //cookies (.select means jojo field nhi bhejni)
        const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
        //send cookies
        const options={
            httpOnly:true, //means only modified from server side
            secure:true

        }
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(200,
                {
                    user:loggedInUser,accessToken,refreshToken
                },
                "User logged In Successfully"
            )
        )

})

const logoutUser=asyncHandler(async(req,res)=>
{
    //humeh user mila because of verify jwt last line req.user=user
    await User.findByIdAndUpdate(
        req.user._id, //isse find kro user ko
        {//updATE KRNA KYA HA
            
            $set:
            {
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true, //means only modified from server side
        secure:true

    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out"))
})

export {registerUser,loginUser,logoutUser}