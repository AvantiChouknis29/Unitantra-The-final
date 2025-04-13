const jwt=require("jsonwebtoken")
const Agency=require("../model/agency")
const authAgencyMiddleware=async(req,res,next)=>{
const token=req.header("Authorization")

if(!token){
    return res.status(401).json({message:"Unauthorized HTTP,Token not provided"})
}


const jwtToken=token.replace("Bearer","").trim()
console.log("Token from auth middleware",jwtToken)

try{
    const isVerifiedAgent=jwt.verify(jwtToken,process.env.JWT_TOKEN_AGENCY)
  

    const agencyData=await Agency.findOne({email:isVerifiedAgent.email}).select({password:0,})
    console.log(agencyData)

    req.agency=agencyData
    req.token=token;
    req.agencyID=agencyData._id

    next()
}catch(error){
    return res.status(401).json({message:"Unauthorized.Invalid token"})
}

}
module.exports=authAgencyMiddleware