import mongoose from "mongoose";

const xraySchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // X-Ray Details
        bodyPart: {
            type: String,
            required: true,
            enum: [
                "chest", "chest-pa", "chest-ap", "chest-lateral",
                "skull", "skull-ap", "skull-lateral",
                "spine-cervical", "spine-thoracic", "spine-lumbar", "spine-sacral",
                "pelvis", "hip", "knee", "ankle", "foot",
                "shoulder", "elbow", "wrist", "hand",
                "abdomen", "kub",
                "dental", "opg",
                "other"
            ]
        },

        viewType: {
            type: String,
            enum: ["AP", "PA", "lateral", "oblique", "lordotic", "decubitus", "other"],
            default: "PA"
        },

        // Clinical Indication
        clinicalIndication: { type: String },

        // Technique
        technique: {
            kvp: { type: Number },                                // Kilovoltage Peak
            mas: { type: Number },                                // Milliampere-seconds
            contrast: { type: Boolean, default: false }
        },

        // Report
        findings: { type: String, required: true },
        impression: { type: String, required: true },

        // Comparison
        comparisonWithPrevious: { type: String },
        previousDate: { type: Date },

        // Images
        imageUrls: [{ type: String }],

        // Reporting
        reportedBy: { type: String },                           // Radiologist name
        reportedDate: { type: Date, default: Date.now },

        // Status
        status: {
            type: String,
            enum: ["pending", "reported", "verified"],
            default: "pending"
        },

        billId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bill",
            required: true
        },

        remarks: { type: String },
        testDate: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const XRay = mongoose.model("XRay", xraySchema);

export default XRay;
