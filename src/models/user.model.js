import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new Schema(
    {
        username:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true       //to make it searchable we use index=true
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:
        {
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:
        {
            type:String, //cloudinary url(like aws service)
            required:true,
        },
        coverImage:
        {
            type:String,  //cloudinary url
        },
        watchhistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:
        {
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:
        {
            type:String
        }

    },
    {
        timestamps:true
    }
)
//data save hone se phle merako kuch kam krana ha
userSchema.pre("save",async function (next) 
{
    //jab bhi password save ho rha ho toh passfield ko lo aur encypt krke save krlo
    //bcypt encrypt the password
    if(!this.isModified("password")) return next();  //this will run this part of code only when user want
    //to change password if not write this  then it will call every time before save anyhting and pasword save evey time
    this.password=await bcrypt.hash(this.password,10)
    next()
}
)
//whether pass is correct or not
userSchema.methods.isPasswordCorrect =async function (password)
{
    //check krke bata ha
    return await bcrypt.compare(password,this.password)//compare give true or false
}

//access token generate method create using the same above 
userSchema.methods.generateAccessToken = async function() 
{
    //sign help to gerate token
    return jwt.sign(
        {
            //id automatically generate in datase by mongo db
            //paylod diya
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        //access token
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {
            //id automatically generate in datase by mongo db
            //paylod diya
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        //refresh token
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)