import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../prisma.js";

//only user role can apply 
const applyToJob=asyncHandler(async(req,res)=>{
   const jobId=Number(req.params.id);
   const userId=req.user.id;
   if(isNaN(jobId)){
    throw new AppError("id invalid",400);
   }
   //fetch the job 
   const job=await prisma.job.findUnique({
    where:{id:jobId}
   })
   if(!job){
    throw new AppError("couldnt find job " , 404);
   }
   //create the application 
   const application = await prisma.application.create({
     data:{
        user:{
            connect:{id:userId}
        },
       job:{
         connect:{id:jobId},
       }
     }
   });

   if(!application){
    throw new AppError("failed to apply " , 400);
   }
// console.log(application)
   return res.status(201).json({
    success:true,
    message:"applied successfully",
    application
   })
});
export {applyToJob};