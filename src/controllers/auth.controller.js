import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma.js'
import {generateAccessToken} from '../utils/token.js'
import { generateRefreshToken } from '../utils/token.js'

const register=async (req,res)=>{
    try{
        const {fullName,userName,email,password,role}=req.body;
        if(!fullName || !userName || !email || !password || !role ){
            console.log("empty field");
           return res.status(400).json({ success: false, message: 'all fields are required' })
        }
        const hashedPass=await bcrypt.hash(password,10);
        const e=await prisma.user.findUnique({where : {email : email}});
        const u=await prisma.user.findUnique({where : {userName : userName}});
        if(e||u){
            console.log(e + " is in use ");
            return res.status(409).json({success:false,messgage:"field is in use by other user"});
            //409 is for conflict 
        }
        
        //register as a normal user 
        const user=await prisma.user.create({
            data:{
                fullName:fullName,
                userName:userName,
                email:email,
                password:hashedPass,
                role:role
            }
        })

       const { pass, ...userWithoutPassword } = user;

        return res.status(201).json({//201 is for created and 200 is for ok 
            success:true,
            message:"user created successfully ",
            user : userWithoutPassword 
        })
        
    }catch(err){
        console.log('failed to register',err.message);
        return res.status(500).json({ success: false, message: err.message })
    }
}


const login=async(req,res)=>{
    try{
        const {userName,email,password}=req.body;
        //validating the info
        if(!password || (!userName && !email)){
           console.log("empty field");
           return res.status(400).json({ success: false, message: 'all fields are required' })
        }
        //fetch the user 
        const user=await prisma.user.findFirst({
            where :{
                OR:[{userName:userName},{email:email}]
            }
        })
        if(user===null){
            console.log("user doesnt exist");
            return res.status(404).json({success:false,message:"user doesnt exist"})
        }
        //verify the password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            console.log("password incorrect");
            return res.status(400).json({success:false,message:"password incorrect"});
        }
        //generate access token and send via cookies  
        const payload={id:user.id,role:user.role};
        const token=generateAccessToken(payload);
        const refToken=generateRefreshToken(payload);

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


    }catch(err){
         console.log('failed to login',err.message);
        return res.status(500).json({ success: false, message: err.message })
    }
}





export {login , register};

