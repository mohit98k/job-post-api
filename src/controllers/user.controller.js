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
        where : {id:id},
        include:{skills:true}
    })
    if(!user){
        throw new AppError("user not found " , 404);
    }
    const {password:userPassword , ...userWithoutPass}=user;
    return res.status(200).json({
        success: true,
        message: "user fetched successfully",
        userWithoutPass
    });
    
})



/*logic :
verify the user is logged in by authmiddleware (verifyJWT)
verify the user has role of user else unauthorized accesss by the isUser middleware 
take the skill from req.body 
check its existance in the Skill model 
check if the user is trying to re-add a skill he already has 
then add the id to the skills array of the user model and the user id in the skill model ---> Prisma handles this automatically.
return res as 200
*/ 
const addSkill=asyncHandler(async(req,res)=>{
    const skill=req.body.skill?.trim().toLowerCase();
    if(!skill){
        throw new AppError("skillName is required", 400);
    }

    const userId=req.user.id;
    const user =await prisma.user.findUnique({
        where :{id : userId},
        include:{skills:true}
    })
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const existingSkill=await prisma.skill.findUnique({
        where : {skillName:skill}
    })
    if(!existingSkill){
            throw new AppError("skill does not exist", 404 );
    }

    const alreadyAdded = user.skills.some(s => s.id === existingSkill.id)
    if (alreadyAdded) {
       throw new AppError("Skill already in use to your profile", 409)
    }

   
    const result=await prisma.user.update({
        where:{id:userId},
        data:{
            skills:{
                connect:{id:existingSkill.id}
            }
        }
    })
    return res.status(200).json({
        message: "Skill added successfully",
        skill: existingSkill.skillName
    });
})
export  {getMe,getUser,addSkill};

// throw AppError → declare problem
// async handler -> catch the errror 
// error middleware → handle problem