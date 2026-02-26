import Patient from "../models/patient.model.js";
import patientReportSchema from "../models/patientReport.model.js";

export const createPatient_DAO = async (data) => {
    return await Patient.create(data);
};

export const getAllPatients_DAO = async (page, limit) => {
    const skip = (page - 1) * limit;

    const patients = await Patient.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Patient.countDocuments();

    return { patients, total };
};

export const getPatientById_DAO = async (id) => {
    return await Patient.findById(id).populate("reports");
};


export const updatePatient_DAO = async (id, data) => {
    return await Patient.findByIdAndUpdate(id, data, { new: true });
};


export const deletePatient_DAO = async (id) => {
    return await Patient.findByIdAndDelete(id);
};

