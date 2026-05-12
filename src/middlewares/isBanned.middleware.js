import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../prisma.js"

const checkBanStatus = asyncHandler(async(req,res,next)=>{
   const user = await prisma.user.findUnique({
      where:{id:req.user.id},
      select:{isBanned:true}
   });

   if(user.isBanned){
      throw new AppError("account banned",403);
   }

   next();
})
export default checkBanStatus;