import TestAppointment from "../models/testAppointment.model.js"

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