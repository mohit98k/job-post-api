import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAdmin=asyncHandler(async(req,res,next)=>{
    const user=req.user;
    if(user.role !== "GOD"){
        throw new AppError("access Denied",409);
    }
    next();
})

export default isAdmin;