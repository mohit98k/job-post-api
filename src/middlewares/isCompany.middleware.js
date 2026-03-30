import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const isCompany=asyncHandler(async(req,res,next)=>{
    const user =req.user;
    if(user.role !== "COMPANY"){
       throw new AppError("access denied",400);
    }
    next();
})

export default isCompany;