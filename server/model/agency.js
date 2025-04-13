const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const agencySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    country: { type: String, required: true },
    city:{ type: String, required: true},
    address:{ type: String, required: true},
    designation:{ type: String, required: true},

    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verifiedAgent: {
        type: Boolean,
        default: false,
    }
});


//jwt
agencySchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
           // agencyVerified:this.agencyVerified
        },
    process.env.JWT_TOKEN_AGENCY
    )
    }catch(error){
        console.error(error)
    }
}


const Agency = new mongoose.model("Registered_agency", agencySchema);

module.exports = Agency;
