const mongoose = require('mongoose');

const agencyStudentSchema = new mongoose.Schema({
  university: { type: String, required: true },
  course: { type: String, required: true },
  link: { type: String, required: true },
  userUID: { type: String, required: true },
  agencyId: { 
    type: String, // Changed from ObjectId to String
    required: true 
  }
}, { timestamps: true });

const Student = mongoose.model('AgencyStudentApplication', agencyStudentSchema);

module.exports = Student;
