class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    )
    {
        //overrite message
        super(message);
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors
//error in stack phase
        if(stack)
        {
            this.stack=stack
        }
        else{
            Error.captureStacktree(this,this.constructor)
        }
    }
}

export {ApiError}