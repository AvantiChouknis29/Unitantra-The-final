const {Schema,model} =require('mongoose')
const movieTicketSchema=new Schema({
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
 
})

const movieTicket=new model('movieticket',movieTicketSchema)
module.exports=movieTicket;