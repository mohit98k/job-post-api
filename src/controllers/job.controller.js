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




//get job with id 
const getJob=asyncHandler(async(req,res)=>{
    const id=Number(req.params.id);
    if(isNaN(id)){
      throw new AppError("job id invalid ",400);
    }
    
    const job=await prisma.job.findUnique({
        where : {id:id},
        include:{
            tags : {
                select:{tagValue:true}
            },
            skills:{
                select:{skillName:true}
            },
            // applications:{
            //     select:{userId:true}
            // }
        }
    })
    if(!job){
        throw new AppError("couldnt find job with given id " , 404);
    }
    return res.status(200).json({
        success:true,
        message:"found the job ",
        job
    })

});


//get the latest jobs 
const getJobs=asyncHandler(async(req,res)=>{
 const {skills,tags,location,jobRole,cursor}=req.query;
 if (cursor && (isNaN(cursor) || Number(cursor) < 0)) {
   throw new AppError("invalid cursor value", 400);
 }
 const limit = 5 ;
 
 const where = {};
 if(location)where.location = location ;
 if(jobRole)where.jobRole=jobRole.toLowerCase();
 if(skills){
    const skillArray=skills.split(",")
    where.skills= {
        some:{
            skillName:{in : skillArray}
        }
    }
 }
 if(tags){
    const tagArray=tags.split(",");
    where.tags={
        some:{
            tagValue:{in:tagArray}
        }
    }
 }

 const jobs=await prisma.job.findMany({
    ...(cursor &&{
        cursor:{id:Number(cursor)}        
    }),
    take:limit+1,
    where,
    orderBy:[{createdAt:"desc"},{id:"desc"}],
    include:{
        skills:{
            select : {skillName:true}
        },
        tags:{
            select: {tagValue:true}
        }
    }
 })

 if(jobs.length===0){
    throw new AppError("no job found " ,404);
 }

 //handle the pagination 
 let nextCursor=null;
 if(jobs.length>limit){
    const lastJob=jobs.pop();
    nextCursor=lastJob.id;
 }
 return res.status(200).json({
    success:true,
    messgae:"Job fetch successfull",
    data:jobs,
    nextCursor
 })
});


export {createJob,getJob,getJobs};