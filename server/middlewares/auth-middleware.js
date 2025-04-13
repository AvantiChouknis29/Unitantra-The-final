const jwt=require("jsonwebtoken")
const User=require('../model/user-model')
const authMiddleware=async(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token){
       return res.status(401).json({message:"Unauthorized HTTP,Token not provided"})

    }
   //Assuming token is in format "Bearer <jwtToken>,Removing "Bearer" prefix
  const jwtToken=token.replace('Bearer',"").trim();
  console.log("Token from auth middleware",jwtToken)

  try{
    
    const isVerified=jwt.verify(jwtToken,process.env.JWT_TOKEN)
    console.log(isVerified)
    const userData=await User.findOne({email:isVerified.email}).select({password:0})
    console.log(userData)

    req.user=userData;
    req.token=token;
    req.userID=userData._id;
    
    next();
  }catch(error){
    return res.status(401).json({message:"Unauthorized Invalid Token "})

  }
   
}
module.exports=authMiddleware