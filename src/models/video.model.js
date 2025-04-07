import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema=new Schema(
    {
        videoFile:
        {
            type:String, //cloudinary url
            required:true
        },
        thumbnail:
        {
            type:String,//cloudinaru url
            required:true
        },
        title:
        {
            type:String,
            required:true
        },
        description:
        {
            type:String,
            required:true
        },
        duration:
        {
            type:Number,
            required:true
        },
        views:
        {
            type:Number,
            default:0
        },
        isPublished:  //ki video public ke liye available ha ki nhi ha
        {
            type:Boolean, 
            default:true  //dekhne toh sabko
        },
        owner:
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)   //plugins add krne ke liye

export const Video=mongoose.model("Video",videoSchema)