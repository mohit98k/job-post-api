import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js";
import prisma from "../prisma.js";


const createJob = asyncHandler(async(req,res)=>{
    console.log(req.user)
    if(req.user.company === null){
        throw new AppError("create a company first", 400);
    }
    //input validatio 
    const {jobRole,description,location,salary,experience,tags,skills}=req.body;
    if(!jobRole || !description || !location || !salary || !experience || !tags || !skills){
        throw new AppError("invalid or empty field " , 400);
    }
    if(isNaN(experience) || isNaN(salary)){
        throw new AppError("input filed not a number ", 400);
    }
    //skills and tags input validation 
    const normalizedSkills = skills.map(s => s.toLowerCase());

    const existingSkills = await prisma.skill.findMany({
    where: {
        skillName: { in: normalizedSkills }
    }
    });

    if (existingSkills.length !== normalizedSkills.length) {
    throw new AppError("Invalid skills provided", 400);
    }



    const normalizedTags = tags.map(t => t.toLowerCase());

    const existingTags = await prisma.tag.findMany({
    where: {
        tagValue: { in: normalizedTags }
    }
    });

    if (existingTags.length !== normalizedTags.length) {
    throw new AppError("Invalid tags provided", 400);
    }

    
    //fetch company id
    const companyId=req.user.company.id;
    //create job 
    const job = await prisma.job.create({
        data: {
            jobRole,
            description,
            location,
            salary,
            experience,
            company:{
                connect:{id:companyId}
            },
            tags:{
                connect : tags.map(tag=>({
                    tagValue : tag.toLowerCase()
                }))
            },
            skills:{
                connect: skills.map(skill=>({
                    skillName:skill.toLowerCase()
                }))
            }
        }
    })

    if(!job){
        throw new AppError("job could not be created", 400);
    }

    return res.status(200).json({
        success:true,
        message:"job posted",
        job
    });
})

export {createJob};