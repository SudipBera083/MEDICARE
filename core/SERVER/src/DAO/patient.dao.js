import Patient from "../models/patient.model.js"

// Create new patient
export const createPatient_DAO = async (patientData) => {
  return await Patient.create(patientData);
};

// Find patient by ID
export const findPatientById_DAO = async (id) => {
  return await Patient.findById(id);
};

// Find patient by phone
export const findPatientByPhone_DAO = async (patientPhoneNumber) => {
  return await Patient.findOne({ patientPhoneNumber });
};

// Get all patients
export const getAllPatients_DAO = async () => {
  return await Patient.find().sort({ createdAt: -1 });
};

// Update patient
export const updatePatient_DAO = async (id, updateData) => {
  return await Patient.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

// Delete patient
export const deletePatient_DAO = async (id) => {
  return await Patient.findByIdAndDelete(id);
};

// Search patients by name or phone
export const searchPatients_DAO = async (searchQuery) => {
  const regex = new RegExp(searchQuery, 'i');
  return await Patient.find({
    $or: [
      { firstName: regex },
      { lastName: regex },
      { patientPhoneNumber: regex }
    ]
  });
};