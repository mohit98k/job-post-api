import redis from "../config/redis.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js";

 
const rateLimitLogin=asyncHandler(async(req,res,next)=>{
    const ip=req.ip;
    const key=`login:${ip}`;
    const limit=5;
    const now=Date.now();
    const windowMS=30*1000;
    
    await redis.pipeline()
               .zremrangebyscore(key,0,now-windowMS)
               .zadd(key,now,`${now}:${Math.random()}`)
               .expire(key,60)
               .exec();
    const cnt = await redis.zcard(key);
    if(cnt>limit){
        throw new AppError("too many request " ,429);
    }
    next();
})

const rateLimitSingUp=asyncHandler(async(req,res,next)=>{
    const ip=req.ip;
    const key=`singup:${ip}`;
    const limit=5;
    const now=Date.now();
    const windowMS=30*1000;
    
    // await redis.zadd(key,now,`${now}:${Math.random()}`);
    // await redis.expire(key,60);
    // await redis.zremrangebyscore(key,0 ,now-windowMS);

    await redis.pipeline()
               .zremrangebyscore(key,0,now-windowMS)
               .zadd(key,now,`${now}:${Math.random()}`)
               .expire(key,60)
               .exec();

    const cnt = await redis.zcard(key);
    if(cnt > limit){
       throw new AppError("too many request " ,429);
    }
   
    next();
})
export  {rateLimitSingUp,rateLimitLogin};