const express = require('express');
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");

const router = express.Router();

// Get doctor profile
router.get("/profile", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.uid });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve profile" });
  }
});

// Create a new doctor profile
router.post("/profile", async (req, res) => {
  const doctorData = req.body;

  try {
    // Extract userId if present in doctorData, otherwise use req.uid (assuming it's a valid ObjectId)
    const userId = doctorData.userId || new mongoose.Types.ObjectId(req.uid);  // Ensure valid ObjectId

    // Destructure nested objects for cleaner assignment
    const { personalDetails, professionalDetails, profile, ...rest } = doctorData;

    const newDoctor = await Doctor.create({
      userId,
      personalDetails,
      professionalDetails,
      profile,
      ...rest,
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create doctor profile" });
  }
});

// Update doctor profile
router.put("/profile", async (req, res) => {
  const updates = req.body;

  // Validate some mandatory fields (example)
  if (!updates.name || !updates.specialization) {
    return res
      .status(400)
      .json({ message: "Missing required fields (name, specialization)" });
  }

  try {
    const doctor = await Doctor.findOneAndUpdate({ userId: req.uid }, updates, {
      new: true,
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// Get appointments for a doctor by type (normal/emergency)
router.get("/appointments/:type", async (req, res) => {
  const type = req.params.type.toLowerCase(); // Normalize type

  if (type !== "normal" && type !== "emergency") {
    return res.status(400).json({ message: "Invalid appointment type" });
  }

  try {
    const doctor = await Doctor.findOne({ userId: req.uid });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const appointments = await Appointment.find({ doctor: doctor._id, type });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve appointments" });
  }
});

// Update appointment status (requires doctor role)
router.patch("/appointments/:appointmentId", async (req, res) => {
  const appointmentId = req.params.appointmentId;
  const { status } = req.body;

  if (
    !status ||
    !["arrived", "in-progress", "done", "not-arrived"].includes(status)
  ) {
    return res.status(400).json({ message: "Invalid appointment status" });
  }

  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId },
      { status },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update appointment status" });
  }
});

// (Optional) Create a new appointment (requires doctor role)
router.post("/appointments", async (req, res) => {
  // Implement logic to create a new appointment based on doctor ID, patient details (could be another model), date, slot, and type.
  // Ensure proper validation for all required fields and authorization checks.

  res.json({ message: "Appointment created successfully" }); // Placeholder for successful creation
});

module.exports = router;
