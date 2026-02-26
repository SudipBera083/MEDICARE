import {
    createPatient_Service,
    getAllPatients_Service,
    getPatientById_Service,
    updatePatient_Service,
    deletePatient_Service
} from "../services/patient.service.js";

export const createPatient = async (req, res) => {
    try {
        const patient = await createPatient_Service(req.body);
        res.status(201).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllPatients = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const data = await getAllPatients_Service(page, limit);

        res.status(200).json({ success: true, ...data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPatientById = async (req, res) => {
    try {
        const patient = await getPatientById_Service(req.params.id);

        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const patient = await updatePatient_Service(req.params.id, req.body);

        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const patient = await deletePatient_Service(req.params.id);

        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({ success: true, message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};