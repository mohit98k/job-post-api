import jwt from 'jsonwebtoken';

const generateAccessToken=(payload)=>{
   const token =jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1d' })
   return token ;
}
const generateRefreshToken= (payload)=>{
   const token =jwt.sign(payload,process.env.REFRESH_TOKEN_SECRE,{ expiresIn: '7d' })
   return token ;
}

export {generateAccessToken , generateRefreshToken};