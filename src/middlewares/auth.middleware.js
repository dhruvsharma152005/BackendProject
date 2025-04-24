//verify krega user ha ya nhi ha

import {ApiError} from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT=asyncHandler(async(req,_,next)=>
{
    try {
        //ya toh cookie se token laga do ya toh req.header lgake
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")//through this(replace) we can get token
        if(!token)
        {
            throw new ApiError(401,"Unauthorizes request")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user)
        {
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
        
    }

})