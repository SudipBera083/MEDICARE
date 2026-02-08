import mongoose from "mongoose";

const mriSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // MRI Type
        bodyPart: {
            type: String,
            required: true,
            enum: [
                "brain", "brain-with-contrast", "brain-mra", "brain-mrv",
                "orbit", "iac", "pituitary",
                "cervical-spine", "thoracic-spine", "lumbar-spine", "whole-spine",
                "neck", "brachial-plexus",
                "shoulder", "elbow", "wrist", "hand",
                "hip", "knee", "ankle", "foot",
                "chest", "cardiac-mri",
                "abdomen", "liver", "mrcp", "pelvis",
                "prostate", "prostate-mpmri",
                "breast",
                "mra", "mrv",
                "whole-body",
                "other"
            ]
        },

        // Clinical Indication
        clinicalIndication: { type: String },

        // Safety Screening
        safetyScreening: {
            pacemaker: { type: Boolean, default: false },
            metalImplants: { type: Boolean, default: false },
            claustrophobia: { type: Boolean, default: false },
            pregnancy: { type: Boolean, default: false },
            kidneyDisease: { type: Boolean, default: false },
            otherContraindications: { type: String }
        },

        // Technique
        technique: {
            fieldStrength: { type: String, enum: ["1.5T", "3T", "other"] },
            contrastUsed: { type: Boolean, default: false },
            contrastType: { type: String },                       // Gadolinium
            contrastVolume: { type: Number },                     // mL
            sequences: [{
                type: String,
                enum: ["T1", "T2", "T1-contrast", "FLAIR", "DWI", "ADC", "SWI", "GRE", "STIR", "PD", "MRA-TOF", "MRV", "other"]
            }]
        },

        // Findings by Sequence (for brain)
        sequenceFindings: {
            t1: { type: String },
            t2: { type: String },
            flair: { type: String },
            dwi: { type: String },
            swi: { type: String },
            postContrast: { type: String }
        },

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

const MRI = mongoose.model("MRI", mriSchema);

export default MRI;
