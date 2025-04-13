const {Schema,model} =require('mongoose')
const ieltsSchema=new Schema({
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
    duration:{
        type:String,
        required:false,
    }
})

const IELTS=new model('IELTS',ieltsSchema)
module.exports=IELTS;