const {Schema,model}=require('mongoose')
const applicationsSchema=new Schema({
    university:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    userUID:{
        type:String,
        required:true
    },
    agencyId:{
        type:String,
        required:true
    },
    mystatus:{
        type:String,
        default: "Pending" 
    }

})
module.exports = model('agencystudentapplication', applicationsSchema);
