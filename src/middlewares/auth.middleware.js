import jwt  from "jsonwebtoken";
import prisma from "../prisma.js";
const verifyJWT=async (req,res,next)=>{
    try{
        const token=req.cookies?.accessToken;

        if(!token){
            console.log("null token ");
             return res.status(401).json({message:"null token cant do jwt authetication "});
        }

        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user=await prisma.user.findUnique({
            where : {id:decodedToken.id},
        });

        if(!user){
          return res.status(401).json({message:"invalid access token for this user"});
        }
        const {password:userPass, ...userWithoutPassword}=user;
        req.user = userWithoutPassword;
        next();

    }catch (err){
        console.log("failed to verify the jwt");
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}

export default verifyJWT;