import mongoose from "mongoose";

const testedParameterSchema = new mongoose.Schema({
  parameterName: { type: String, required: true },
  testedValue: { type: Number, required: true }
}, { _id: false });

const patientReportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MasterTest",
    required: true
  },
  testedParameters: [testedParameterSchema],
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("PatientReport", patientReportSchema);