import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js";
import prisma from "../prisma.js";



const getMe=asyncHandler(async(req,res)=>{
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
//this one is for fetching any user that is not me 
const getUser=asyncHandler(async(req,res)=>{
    const id = Number(req.params.id);
    if (isNaN(id)) {
       throw new AppError("invalid user id", 400);
    }
    if(id===req.user.id){
       return getMe(req,res);
    }
    const user=await prisma.user.findUnique({
        where : {id:id}
    })
    if(!user){
        throw new AppError("user not found " , 404);
    }
    return res.status(200).json({
        success: true,
        message: "user fetched successfully",
        user
    });
    
})


export  {getMe,getUser};

// throw AppError → declare problem
// async handler -> catch the errror 
// error middleware → handle problem