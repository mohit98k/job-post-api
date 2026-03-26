import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js";

const getUser=asyncHandler(async(req,res)=>{
    const user=req.user;
    if(!user){
        throw new AppError("user not found",404);
    }
     return res.status(200).json({
            success:true,
            message:"found user",
            user:user
        });
})


export default getUser;

// throw AppError → declare problem
// async handler -> catch the errror 
// error middleware → handle problem