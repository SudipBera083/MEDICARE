import { bookNewTestAppointment_DAO } from "../DAO/testAppointment.dao.js";
import TestAppointment from "../models/testAppointment.model.js";

// Book a new test appointment
export const bookTestAppointment_controller = async (req, res) => {
    try {
        const { PatientID, testID, testDate, testStatus, paymentID, billID } = req.body;

        // Validate required fields
        if (!PatientID || !testID || !testDate) {
            return res.status(400).json({
                message: "Missing required fields",
                required: ["PatientID", "testID", "testDate"]
            });
        }

        const newAppointment = await bookNewTestAppointment_DAO(
            PatientID,
            testID,
            testDate,
            testStatus || "pending",
            paymentID,
            billID
        );

        return res.status(201).json({
            message: "Test appointment booked successfully ✅",
            appointment: newAppointment
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | bookTestAppointment_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to book test appointment",
            error: error.message
        });
    }
};

// Get all test appointments
export const getAllTestAppointments_controller = async (req, res) => {
    try {
        const appointments = await TestAppointment.find()
            .populate("PatientID")
            .populate("testID")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Test appointments retrieved successfully ✅",
            count: appointments.length,
            appointments
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getAllTestAppointments_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to get test appointments",
            error: error.message
        });
    }
};

// Get test appointment by ID
export const getTestAppointmentById_controller = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await TestAppointment.findById(id)
            .populate("PatientID")
            .populate("testID");

        if (!appointment) {
            return res.status(404).json({
                message: "Test appointment not found"
            });
        }

        return res.status(200).json({
            message: "Test appointment retrieved successfully ✅",
            appointment
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getTestAppointmentById_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to get test appointment",
            error: error.message
        });
    }
};

// Get appointments by patient ID
export const getAppointmentsByPatient_controller = async (req, res) => {
    try {
        const { patientId } = req.params;

        const appointments = await TestAppointment.find({ PatientID: patientId })
            .populate("testID")
            .sort({ testDate: -1 });

        return res.status(200).json({
            message: "Patient appointments retrieved successfully ✅",
            count: appointments.length,
            appointments
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getAppointmentsByPatient_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to get patient appointments",
            error: error.message
        });
    }
};

// Update test appointment status
export const updateTestAppointment_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedAppointment = await TestAppointment.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({
                message: "Test appointment not found"
            });
        }

        return res.status(200).json({
            message: "Test appointment updated successfully ✅",
            appointment: updatedAppointment
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | updateTestAppointment_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to update test appointment",
            error: error.message
        });
    }
};

// Delete test appointment
export const deleteTestAppointment_controller = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAppointment = await TestAppointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({
                message: "Test appointment not found"
            });
        }

        return res.status(200).json({
            message: "Test appointment deleted successfully ✅",
            appointment: deletedAppointment
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | deleteTestAppointment_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to delete test appointment",
            error: error.message
        });
    }
};
