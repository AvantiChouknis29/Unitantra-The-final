const {Schema,model} =require('mongoose')
const counsellingSchema=new Schema({
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
    
})

const Counselling=new model('Counselling',counsellingSchema)
module.exports=Counselling;