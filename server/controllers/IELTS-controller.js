const IELTS=require("../model/ielts")
const IELTSForm=async(req,res)=>{
    try{
        const response=req.body
        await IELTS.create(response)
        return res.status(500).json({ message: "Message send successfully!" });
  
    }catch(error){
        return res.status(500).json({ message: "Failed!" });
  
    }
}
module.exports=IELTSForm;