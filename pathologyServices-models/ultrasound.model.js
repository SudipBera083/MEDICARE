import mongoose from "mongoose";

const ultrasoundSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Ultrasound Type
        scanType: {
            type: String,
            required: true,
            enum: [
                "abdomen", "abdomen-pelvis", "pelvis",
                "liver", "gallbladder", "pancreas", "spleen", "kidneys", "kub",
                "thyroid", "neck", "breast",
                "obstetric", "obstetric-early", "obstetric-anomaly", "obstetric-growth",
                "transvaginal", "transrectal",
                "musculoskeletal", "soft-tissue",
                "vascular", "doppler", "carotid-doppler",
                "echocardiography", "echo",
                "scrotal", "testicular",
                "other"
            ]
        },

        // Clinical Indication
        clinicalIndication: { type: String },

        // Patient Preparation
        preparation: {
            type: String,
            enum: ["fasting", "full bladder", "none", "other"],
            default: "none"
        },

        // Findings by Organ
        findings: {
            liver: {
                size: { type: String },
                echotexture: { type: String },
                findings: { type: String }
            },
            gallbladder: {
                size: { type: String },
                wall: { type: String },
                stones: { type: String },
                findings: { type: String }
            },
            cbd: { type: String },                                // Common Bile Duct
            pancreas: {
                size: { type: String },
                findings: { type: String }
            },
            spleen: {
                size: { type: String },
                findings: { type: String }
            },
            rightKidney: {
                size: { type: String },
                cortex: { type: String },
                cmd: { type: String },                              // Corticomedullary Differentiation
                pcs: { type: String },                              // Pelvicalyceal System
                findings: { type: String }
            },
            leftKidney: {
                size: { type: String },
                cortex: { type: String },
                cmd: { type: String },
                pcs: { type: String },
                findings: { type: String }
            },
            urinaryBladder: {
                shape: { type: String },
                wall: { type: String },
                volume: { type: String },
                findings: { type: String }
            },
            prostate: {
                size: { type: String },
                volume: { type: String },
                findings: { type: String }
            },
            uterus: {
                size: { type: String },
                position: { type: String },
                endometrium: { type: String },
                findings: { type: String }
            },
            ovaries: {
                right: { type: String },
                left: { type: String },
                findings: { type: String }
            },
            other: { type: String }
        },

        // Measurements
        measurements: [{
            parameter: { type: String },
            value: { type: String },
            unit: { type: String }
        }],

        // Overall
        overallFindings: { type: String },
        impression: { type: String, required: true },

        // Images
        imageUrls: [{ type: String }],

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

const Ultrasound = mongoose.model("Ultrasound", ultrasoundSchema);

export default Ultrasound;
