const mongoose = require('mongoose');
// const AppointmentSchema = require('../models/appointment')

const DoctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  doctorId: { type: String, required: true, unique: true }, // 4-digit ID
  personalDetails: {
    name: { type: String, required: true },
    // ... other personal details
  },
  professionalDetails: {
    degrees: [String],
    // ... other professional details
  },
  profile: {
    photoUrl: String,
    collegeName: String,
    clinic: {
      title: String,
      photos: [String],
      contactNumber: String,
    },
    fees: {
      normal: Number,
      emergency: Number,
    },
    specialization: String,
    symptoms: [String],
    bio: String,
    registrationNumber: String,
    hospitalAffiliation: String,
  },
  isApproved: { type: Boolean, default: false },
 
});



module.exports = mongoose.model('Doctor', DoctorSchema);
// module.exports = mongoose.model('Appointment', AppointmentSchema);
