// addstudentagency.js

const mongoose = require('mongoose');
const agencyAddStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  UID: { type: String, required: true },// Added UID field
  AgencyId:{ type: String, required: true },
  link:{type: String, required: true}
});

const agencyAddStudent = mongoose.model("agencyAddStudents", agencyAddStudentSchema);
module.exports = agencyAddStudent;
