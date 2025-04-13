const express = require("express");
const router = express.Router();
const {getStudentsByAgencyId, agency_register, agency_home,agency_login,agency_data,} = require("../controllers/agency-controller");
const authAgencyMiddleware=require("../middlewares/auth-agency-middleware") 
const agencysignupSchema=require("../validators/agency-validator")
//const agencyLoginSchema=require("../validators/agency-validator")
const agencyvalidate=require("../middlewares/agency-validate-middleware")

router.get('/home', agency_home);
router.post('/agency_register', agency_register);
router.post('/agency_login', agency_login);
router.get('/agency_data', authAgencyMiddleware,agency_data);
router.get('/students/:agencyId', getStudentsByAgencyId);
module.exports = router;
