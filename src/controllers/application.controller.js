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


const getMyApplications=asyncHandler(async(req,res)=>{
  const user=req.user ;
  const applicatins=await prisma.application.findMany({
    where : {userId:user.id}
  }) 
  if(applicatins.length===0){
    throw new AppError("no applicatinos found " , 404);
  }
  console.log(applicatins);
  return res.status(200).json({
    success:true,
    message:"fetched applicatinos",
    applicatins
  })
});

export {applyToJob,getMyApplications};