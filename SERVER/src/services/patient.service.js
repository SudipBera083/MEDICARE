import {
    createPatient_DAO,
    getAllPatients_DAO,
    getPatientById_DAO,
    updatePatient_DAO,
    deletePatient_DAO
} from "../DAO/patient.dao.js";

export const createPatient_Service = async (data) => {
    return await createPatient_DAO(data);
};

export const getAllPatients_Service = async (page, limit) => {
    return await getAllPatients_DAO(page, limit);
};

export const getPatientById_Service = async (id) => {
    return await getPatientById_DAO(id);
};

export const updatePatient_Service = async (id, data) => {
    return await updatePatient_DAO(id, data);
};

export const deletePatient_Service = async (id) => {
    return await deletePatient_DAO(id);
};