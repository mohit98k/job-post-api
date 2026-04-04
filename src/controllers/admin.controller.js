import prisma from "../prisma.js"
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const createTag=asyncHandler(async(req,res)=>{
    const { tagValue } = req.body;
    if(!tagValue || tagValue.trim() === ""){
        throw new AppError("tag field empty", 400);
    }
    const tag =await prisma.tag.create({
        data:{
            tagValue
        }
    })
    if(!tag){
        throw new AppError("failed to create new tag",400);
    }
    return res.status(201).json({
        success:true,
        message:"new tag created ",
        tag
    })
})


const createSkill=asyncHandler(async(req,res,next)=>{
    const {skillName}=req.body;
     if(!skillName || skillName.trim() === ""){
        throw new AppError("skill field empty", 400);
    }
    // console.log(Object.keys(prisma));
    const skill =await prisma.skill.create({
        data:{
            skillName
        }
    })
    if(!skill){
        throw new AppError("failed to create new tag",400);
    }
    return res.status(201).json({
        success:true,
        message:"new skill created ",
        skill
    })

})


export {createTag,createSkill};