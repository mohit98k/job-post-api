import verifyJWT from "../middlewares/auth.middleware";
import prisma from "../prisma.js";
const getUser=async(req,res)=>{
    try{
        const userwithoutPass =req.user;
        return res.status(200).json({
            success:true,
            message:"found the user ",
            user:userwithoutPass
        })
    }catch(err){
        console.log("failed to obtain user ")
        return res.status(404).json({
            success:false,
            message:"failed to obtain user"
        })
    }
}