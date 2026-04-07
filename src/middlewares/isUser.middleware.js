import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isUser=asyncHandler(async(req,res,next)=>{
    const role=req.user.role;
    if(role !== "USER"){
        throw new AppError("access denied", 403);
    }
    next();
})
export default isUser;