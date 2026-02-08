import TestAppointment from "../models/testAppointment.model.js"

export const getAppointmentById_DAO = async (appointmentId) => {
    try {
        const appointment = await TestAppointment.findById(appointmentId)
            .populate('PatientID')
            .populate('testID');

        if (!appointment) {
            throw new Error(`Appointment not found with ID: ${appointmentId}`);
        }
        return appointment;
    } catch (error) {
        throw new Error(`DAO LAYER ERROR | getAppointmentById_DAO | ${error.message}`);
    }
};

export const updateAppointmentBillId_DAO = async (appointmentId, billId) => {
    try {
        return await TestAppointment.findByIdAndUpdate(
            appointmentId,
            { billID: billId },
            { new: true }
        );
    } catch (error) {
        throw new Error(`DAO LAYER ERROR | updateAppointmentBillId_DAO | ${error.message}`);
    }
};

export const bookNewTestAppointment_DAO = async (PatientID, testID, testDate, testStatus, paymentID, billID) => {
    try {
        if (!testID) {
            throw new Error("Test ID is required")
        } if (!PatientID) {
            throw new Error("Patient ID is required")
        } if (!testDate) {
            throw new Error("Test Date is required")
        }
        const newTestAppointment = await new TestAppointment({
            PatientID,
            testID,
            testDate,
            testStatus,
            paymentID,
            billID
        })
        return await newTestAppointment.save()
    } catch (error) {
        throw new Error(`DAO LAYER ERROR | bookNewTestAppointment_DAO | ${error} `)
    }
}