const {Schema,model}=require("mongoose")
const agencyProfileSchema=new Schema({
    companyname:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    country:{type:String,required:true},
    city:{type:String,required:true},
})

//model
const AgencyProfile=new model('agencyProfile',agencyProfileSchema)
module.exports=AgencyProfile;