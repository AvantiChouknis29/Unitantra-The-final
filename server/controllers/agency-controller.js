const Agency = require("../model/agency");
const bcrypt = require("bcryptjs");
const agencyAddStudents =require("../model/addstudentagency")
const agency_home = async (req, res) => {
    try {
        res.status(200).send("Welcome");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const agency_register = async (req, res) => {
    try {
        const { companyname, email, phone, country, city, address, designation, password } = req.body;
        const agencyExist = await Agency.findOne({ email: email });
        if (agencyExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);
        const agencyCreated = await Agency.create({
            companyname,
            email,
            phone,
            country,
            city,
            address,
            designation,
            password: hash_password
        });
        return res.status(200).json({ message: "Registration Successful!",token:await agencyCreated.generateToken(),userId:agencyCreated._id.toString()});
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
        }
    }
};

const agency_login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const agencyExist = await Agency.findOne({ email });

        if (!agencyExist || !await bcrypt.compare(password, agencyExist.password) || !agencyExist.verifiedAgent) {
            return res.status(400).json({ message: "Invalid Credentials/account not verified" });
        }

        return res.status(200).json({
            message: "Login Successful!",
            token: await agencyExist.generateToken(),
            userId: agencyExist._id.toString()
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
};

const agency_data=async (req,res)=>{
    try{
        const agencyData=req.agency;
        console.log(agencyData)
        return res.status(200).json({agencyData})
      }catch(error){
        console.log(`error from user route ${error}`)
    }
}

const getStudentsByAgencyId = async (req, res) => {
    const { agencyId } = req.params;
  
    try {
      const students = await agencyAddStudents.find({ AgencyId: agencyId }); // Capital A
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


module.exports = { getStudentsByAgencyId, agency_home, agency_register,agency_login,agency_data };
