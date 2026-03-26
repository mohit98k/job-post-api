import jwt  from "jsonwebtoken";

const isCompany=async(req,res,next)=>{
    const user =req.user;
    if(user.role != "COMPANY"){
        console.log("access denied");
        return res.status()
    }
}