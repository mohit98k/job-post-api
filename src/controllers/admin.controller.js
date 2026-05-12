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


const banUser = asyncHandler(async(req,res)=>{
    const {userId}=req.body ;
    if(!userId)throw new AppError("provide userID", 400);

    //admin cant ban him self
    if(req.user.id == userId)throw new AppError("dont try to ban your self" , 400);

    const user = await prisma.user.findUnique({
        where:{id:userId}
    })
    if(!user)throw new AppError("user dont exist" , 404);
    const del = await prisma.user.update({
        where: { id: userId },
        data: { isBanned: true }
    })

    if(!del)throw new AppError("couldnt ban user"  , 400);
    return res.status(200).json({
        success:true,
        message:"user banned",
        del
    })
})



const unbanUser = asyncHandler(async(req,res)=>{
    const {userId}=req.body ;
    if(!userId)throw new AppError("provide userID", 400);

    //admin cant ban him self
    if(req.user.id == userId)throw new AppError("dont try to ban your self" , 400);

    const user = await prisma.user.findUnique({
        where:{id:userId}
    })
    if(!user)throw new AppError("user dont exist" , 404);
    const del = await prisma.user.update({
        where: { id: userId },
        data: { isBanned: false }
    })

    if(!del)throw new AppError("couldnt ban user"  , 400);
    return res.status(200).json({
        success:true,
        message:"user unbanned",
        del
    })
})


const changePassword=asyncHandler(async(req,res)=>{
    
})

export {createTag,createSkill,banUser,unbanUser,changePassword};