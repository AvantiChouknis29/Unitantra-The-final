const agencyApplications=require("../model/agencyapplicationFetching-model")
const agencyApplication=async(req,res)=>{
    try{

        const response=await agencyApplications.find()

        if(!response){
            res.status(404).json({msg:"No application found"})
            return;
        }
        res.status(200).json(response);

    }catch(error){
        console.log(`Fetching application error: ${error}`);

    }
}

module.exports=agencyApplication