import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../prisma.js";
import AppError from "../utils/AppError.js";

//only users with role:comany can create company : isCompany middleware 
//this is a protected route so req.user is defined 
const createCompany=asyncHandler(async(req,res)=>{
    const {companyName,websiteLink,about,location}=req.body;

    const user=req.user;
    if(!companyName || !about || !location){
        throw new AppError("incomplete information " , 400 );
    }
    if(!user){
        throw new AppError("user not found",404);
    }


    const id=user.id;

    const company =await prisma.company.create({
        data:{
            companyName,
            websiteLink:websiteLink?.trim()||null,
            about,
            location,
            // userId:user.id <-no need for this prisma will do it automatically 
            user:{
                connect:{id:user.id}
            }
        }
    })
    
    if(!company){
        throw new AppError("failed to create company ",400);
    }

    return res.status(201).json({
        success:true,
        message:"company created",
        company

    })

})

//user with any role can fetch the company details 
const getCompany = asyncHandler(async(req,res)=>{
  const id=Number(req.params.id);
  if(isNaN(id)){
    throw new AppError("company id invalid ",400);
  }
  const company =await prisma.company.findUnique({
    where : {id:id},
    include:{
        jobs:{
           select :{
            id:true,
            jobRole:true,
            skills:{
                select:{skillName:true}
            },
            tags:{
                select:{tagValue:true}
            }
           }
        }
    }
  })
  if(!company){
    throw new AppError("company not found",404);
  }
  return res.status(200).json({
    success:true,
    message:"found company",
    company
  })
})

export { createCompany,getCompany};

// the deeevil iiiiin yoou'r eyees 
// wont deny
// the lies you've sold
// im hooldinnng on two sides 
// while you let goo ! 
// this is casuaalllll....