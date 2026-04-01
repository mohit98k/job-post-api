import redis from "../config/redis.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js";


const rateLimitLogin=asyncHandler(async(req,res,next)=>{
    const ip=req.ip;
    const limit=5;
    const key=`singup:${ip}`;
    const cnt =await redis.incr(key);
    if(1==cnt)await redis.expire(key,30);
    
    if(cnt>limit){
        throw new AppError("too many request " ,429);
    }
    next();
})
const rateLimitSingUp=asyncHandler(async(req,res,next)=>{
    const ip=req.ip;
    const limit=5;
    const key=`login:${ip}`;
    const cnt =await redis.incr(key);
    if(1==cnt)await redis.expire(key,30);
    
    if(cnt>limit){
        throw new AppError("too many request " ,429);
    }
    next();
})
export  {rateLimitSingUp,rateLimitLogin};