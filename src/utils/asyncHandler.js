//async handler ek method baneya aur use export krega
//one way using promises
//role yha pe as a function accept kru aur as a function return kru
const asyncHandler=(requestHandler)=>
    {
       return (req,res,next)=>{
            Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
        }
    }

export {asyncHandler}





//const asyncHandler=()=>{}
//const asyncHandler=(fun)=>()=>{}
//const asyncHandler=(fn)=>async()=>{}



    /*
    
   //one way using try and catch 
//made a wrapper function which i can use in further work
const asyncHandler=(fn)=>async(req,res,next)=>{
    try
    {
        //jo function liya usko execute krna
            await fn(req,res,next)
    }
    catch(error){ //error respaonse and json response helful for frontend
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })

    }
}
    */