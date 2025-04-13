const mongoose=require("mongoose")
const profileSchema=new mongoose.Schema({
    username:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
       
    },
    phone:{
        type:String,
        required:true,
    },
    
   
    
})

const Profile=new mongoose.model("Profile",profileSchema)

module.exports=Profile