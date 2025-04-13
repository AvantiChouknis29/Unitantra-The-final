const {Schema,model} =require('mongoose')
const queriesSchema=new Schema({
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
    query:{
        type:String,
        required:true,
    },
   
})

const Queries=new model('queries',queriesSchema)
module.exports=Queries;