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




//first verify jwt so we know the user is logged in and req.user is defined
//role check for comapny so isCompany , and req.comapny is defined 
//inputs are : newStatus value , applicationn id 
//ive company id , application id , through application i can get job id ;
//so from that job id i can fetch the job and get the company id 
//validate if the logged in company is the right full publisher of the job whose application is being updated 
//then only update the enum 
const updateApplicationStatus=asyncHandler(async(req,res)=>{
  const company =req.company ;
  const {newStatus,applicationId}=req.body;
  const arr=["ACCEPTED","REJECTED"];
  if(!arr.includes(newStatus))throw new AppError("unacceptable status" , 400);
  
  const application = await prisma.application.findUnique({
    where : {id:applicationId},
    include:{job:true}
  });
  if(!application)throw new AppError("application not found",404);

  const jobId=application.jobId;
  const companyId=application.job.companyId;

  if(companyId != company.id)throw new AppError("access denied" , 403);
  
  const updatedApplication = await prisma.application.update({
    where:{id:applicationId},
    data:{
      status:newStatus
    }
  })

  if(!updatedApplication)throw new AppError("failed to update" , 400);

  return res.status(200).json({
    success:true,
    message:"status updated successfully",
    updatedApplication
  });
})

export {applyToJob,getMyApplications,updateApplicationStatus};