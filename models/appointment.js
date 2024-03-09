const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Firebase user ID
  patientName: String,
  age: Number,
  gender: String,
  blockName: String, // Optional for scheduling purposes
  date: { type: Date, required: true }, // Appointment date
  slot: { type: String, required: true }, // Appointment time slot
  type: { type: String, enum: ['normal', 'emergency'] },
  status: { type: String, enum: ['arrived', 'in-progress', 'done', 'not-arrived'] },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
