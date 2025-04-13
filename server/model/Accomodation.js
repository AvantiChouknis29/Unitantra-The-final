const mongoose=require("mongoose")

const AccomodationSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
     city:{
        type:String,
        required:true,
    },
    fromDate:{
        type:String,
        required:true,
    },
   
    toDate:{
        type:String,
        required:true,
    }
    
})



const Accomodation=new mongoose.model("accomodation",AccomodationSchema)

module.exports=Accomodation