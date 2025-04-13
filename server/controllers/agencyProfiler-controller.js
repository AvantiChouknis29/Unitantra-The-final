const agencyProfile=require("../model/agencyProfile")

const agencyProfileForm=async(req,res)=>{
    try{
        const response=req.body;
        await agencyProfile.create(response)
        return res.status(200).json({message:"Success"})
    }catch(error){
        return res.status(200).json({message:"Failed"})
     

    }
}
module.exports = { agencyProfileForm };