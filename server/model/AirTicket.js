const mongoose=require("mongoose")

const flightSchema=new mongoose.Schema({
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
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
})



const FlightTicket=new mongoose.model("flightTickets",flightSchema)

module.exports=FlightTicket