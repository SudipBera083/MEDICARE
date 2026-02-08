import {
    createPatient_DAO,
    findPatientById_DAO,
    findPatientByPhone_DAO,
    getAllPatients_DAO,
    updatePatient_DAO,
    deletePatient_DAO,
    searchPatients_DAO
} from "../DAO/patient.dao.js";

// Add new patient
export const addPatient_controller = async (req, res) => {
    try {
        const { firstName, middleName, lastName, patientPhoneNumber } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !patientPhoneNumber) {
            return res.status(400).json({
                message: "Missing required fields",
                required: ["firstName", "lastName", "patientPhoneNumber"]
            });
        }

        // Check if patient already exists with same phone
        const existingPatient = await findPatientByPhone_DAO(patientPhoneNumber);
        if (existingPatient) {
            return res.status(409).json({
                message: "Patient with this phone number already exists",
                patient: existingPatient
            });
        }

        const newPatient = await createPatient_DAO({
            firstName,
            middleName: middleName || "",
            lastName,
            patientPhoneNumber
        });

        return res.status(201).json({
            message: "Patient added successfully ✅",
            patient: newPatient
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | addPatient_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to add patient",
            error: error.message
        });
    }
};

// Get all patients
export const getAllPatients_controller = async (req, res) => {
    try {
        const patients = await getAllPatients_DAO();

        return res.status(200).json({
            message: "Patients retrieved successfully ✅",
            count: patients.length,
            patients
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getAllPatients_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to get patients",
            error: error.message
        });
    }
};

// Get patient by ID
export const getPatientById_controller = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await findPatientById_DAO(id);
        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        return res.status(200).json({
            message: "Patient retrieved successfully ✅",
            patient
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getPatientById_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to get patient",
            error: error.message
        });
    }
};

// Update patient
export const updatePatient_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedPatient = await updatePatient_DAO(id, updateData);
        if (!updatedPatient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        return res.status(200).json({
            message: "Patient updated successfully ✅",
            patient: updatedPatient
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | updatePatient_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to update patient",
            error: error.message
        });
    }
};

// Delete patient
export const deletePatient_controller = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPatient = await deletePatient_DAO(id);
        if (!deletedPatient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        return res.status(200).json({
            message: "Patient deleted successfully ✅",
            patient: deletedPatient
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | deletePatient_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to delete patient",
            error: error.message
        });
    }
};

// Search patients
export const searchPatients_controller = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                message: "Search query 'q' is required"
            });
        }

        const patients = await searchPatients_DAO(q);

        return res.status(200).json({
            message: "Search completed ✅",
            count: patients.length,
            patients
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | searchPatients_controller: ${error}`);
        return res.status(500).json({
            message: "Search failed",
            error: error.message
        });
    }
};
