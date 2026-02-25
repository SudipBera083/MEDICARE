import mongoose from "mongoose";

/*const testAppointmentSchema = new mongoose.Schema({

    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    // Stores multiple selected tests (ONLY names)
    tests: {
        type: [String],   // Example: ["CBC", "LFT", "ThyroidTest"]
        required: true
    },

    testDate: {
        type: Date,
        required: true
    },

    testStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },

    paymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },

    billID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    }
    // thinking to add all patient details here then all the details of patient will be in one place ...... 

}, { timestamps: true });

const TestAppointment = mongoose.model("TestAppointment", testAppointmentSchema);

export default TestAppointment;
*/


const testAppointmentSchema = new mongoose.Schema({

    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    // Store references to TestMaster templates
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TestMaster",
            required: true
        }
    ],

    appointmentDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["booked", "in-progress", "completed", "cancelled"],
        default: "booked"
    },

    paymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },

    billID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    }

}, { timestamps: true });

const TestAppointment = mongoose.model("TestAppointment", testAppointmentSchema);

export default TestAppointment;
