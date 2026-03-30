import bcrypt from 'bcryptjs'
import prisma from '../prisma.js'
import {generateAccessToken} from '../utils/token.js'
import { generateRefreshToken } from '../utils/token.js'
import asyncHandler from '../utils/asyncHandler.js'
import AppError from '../utils/AppError.js'
import crypto from 'crypto';
import jwt  from "jsonwebtoken";


const ALLOWED_ROLES = ['USER', 'COMPANY'];

const register=asyncHandler(async(req,res)=>{
        const {fullname,userName,email,password,role}=req.body;
        if(!fullname || !userName || !email || !password || !role ){
            console.log("empty or illegal field");
           throw new AppError("empty",400);
        }
        const hashedPass=await bcrypt.hash(password,10);
        const safeRole = ALLOWED_ROLES.includes(role) ? role : 'USER';

        const existing = await prisma.user.findFirst({
            where : {
                OR :[{email:email},{userName:userName}]
            }
        })

        if(existing){
            console.log(e + " is in use ");
            throw new AppError("field is in use by other user",409);
            //409 is for conflict 
        }
        
        
        const user=await prisma.user.create({
            data:{
                fullname:fullname,
                userName:userName,
                email:email,
                password:hashedPass,
                role:safeRole
            }
        })

       const { password:userPassword, ...userWithoutPassword } = user;

        return res.status(201).json({//201 is for created and 200 is for ok 
            success:true,
            message:"user created successfully ",
            user : userWithoutPassword 
        })
})


const login= asyncHandler(async(req,res)=>{
   
        const {userName,email,password}=req.body;
        //validating the info
        if(!password || (!userName && !email)){
           console.log("empty field");
           throw new AppError("all fields are required",400);
        }
        //fetch the user 
        const user=await prisma.user.findFirst({
            where :{
                OR:[{userName:userName},{email:email}]
            }
        })
        if(user===null){
            console.log("user doesnt exist");
            throw new AppError("user doesnt exist",404);
        }
        //verify the password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            console.log("password incorrect");
            throw new AppError("password incorrect",400);
        }
        //generate access & ref token and send via cookies  
        const payload={id:user.id,role:user.role};
        const token=generateAccessToken(payload);
        const refToken=generateRefreshToken(payload);
        const hashedRT=crypto.createHash("sha256").update(refToken).digest("hex");

        //save the hashed ref token in db
        
        await prisma.user.update({
            where : {id:user.id},
            data : {refreshToken:hashedRT}
        })

        const { password:userPass, ...userWithoutPassword } = user;
        res.cookie('accessToken',token,{
            httpOnly:true,
            //secure:true, this https condition will break in localhost
            secure: process.env.NODE_ENV === 'production'
        })
         res.cookie('refreshToken',refToken,{
            httpOnly:true,
            //secure:true, this https condition will break in localhost
            secure: process.env.NODE_ENV === 'production'
        })

        return res.status(200).json({
            success:true,
            message:"logged in ",
            user:userWithoutPassword,
        })  
});


//clear tokens with same options and send response 
const logout=asyncHandler(async(req,res)=>{

        const user =req.user;
        //from the db remove the ref token so no one can use a stolen token 
        //after the use logs out
        await prisma.user.update({
            where:{id:user.id},
            data:{refreshToken:null}
        });
        
        res.clearCookie("accessToken",{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production'
        });
        return res.status(200).json({
            success:true,
            message:"logged out user "+user.userName,
            user: null
})

})


const refreshMyToken=asyncHandler(async(req,res)=>{
    //extract the ref token from cookie 
    //validate the cookie ref token by decoding it , if its the real one 
    //then hash and compare from the one stored in db
    //re generate the access token and store in cookie 

    const tokenInCookie=req.cookies.refreshToken;
    if (!tokenInCookie) {
      throw new AppError("No refresh token", 401);
    }
    const decodedToken=jwt.verify(tokenInCookie,process.env.REFRESH_TOKEN_SECRET);
    const user=await prisma.user.findFirst({
        where : {id:decodedToken.id}
    })

    if (!user) {
      throw new AppError("Invalid refresh token", 401);
    }
    const tokenInDb=user.refreshToken;
    const hashedRT=crypto.createHash("sha256").update(tokenInCookie).digest("hex");

    if(hashedRT !== tokenInDb){
        throw new AppError("refresh token not valid ", 401);
    }

    const payload={id:user.id,role:user.role};
    const newAccessToken=generateAccessToken(payload);
    console.log("new access token generated ");
    res.cookie('accessToken',newAccessToken,{
        httpOnly:true,
            secure: process.env.NODE_ENV === 'production'
    })

    return res.status(200).json({
        success: true,
        message: "Access token refreshed"
    });

})

export {login , register , logout,refreshMyToken};

