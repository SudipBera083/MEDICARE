import mongoose from "mongoose";

const ctScanSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // CT Scan Type
        bodyPart: {
            type: String,
            required: true,
            enum: [
                "brain", "head", "orbit", "pns", "temporal-bone",
                "neck", "cervical-spine",
                "chest", "thorax", "hrct-chest",
                "abdomen", "pelvis", "abdomen-pelvis",
                "spine-cervical", "spine-thoracic", "spine-lumbar", "whole-spine",
                "ct-angiography", "coronary-ct", "ct-pulmonary-angiography",
                "ct-kub", "ct-urography",
                "extremity", "upper-limb", "lower-limb",
                "whole-body", "pet-ct",
                "other"
            ]
        },

        // Clinical Indication
        clinicalIndication: { type: String },

        // Technique
        technique: {
            contrastUsed: { type: Boolean, default: false },
            contrastType: { type: String },                       // Iodinated contrast
            contrastVolume: { type: Number },                     // mL
            phases: {
                type: [String],
                enum: ["plain", "arterial", "venous", "delayed", "portal"]
            },
            sliceThickness: { type: Number },                     // mm
            kvp: { type: Number },
            mas: { type: Number }
        },

        // Pre-contrast Assessment (for brain)
        preContrastFindings: { type: String },

        // Post-contrast Enhancement
        postContrastFindings: { type: String },

        // Detailed Findings
        findings: { type: String, required: true },

        // Measurements
        measurements: [{
            structure: { type: String },
            dimension: { type: String },
            value: { type: String }
        }],

        // Impression
        impression: { type: String, required: true },

        // Differential Diagnosis
        differentialDiagnosis: [{ type: String }],

        // Comparison
        comparisonWithPrevious: { type: String },
        previousDate: { type: Date },

        // Images
        imageUrls: [{ type: String }],

        // DICOM Info
        studyInstanceUid: { type: String },
        seriesInstanceUid: { type: String },

        // Reporting
        reportedBy: { type: String },
        reportedDate: { type: Date, default: Date.now },

        // Status
        status: {
            type: String,
            enum: ["pending", "reported", "verified"],
            default: "pending"
        },

        // Radiation Dose
        radiationDose: {
            ctdivol: { type: Number },                            // mGy
            dlp: { type: Number }                                 // mGy.cm
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

const CTScan = mongoose.model("CTScan", ctScanSchema);

export default CTScan;
