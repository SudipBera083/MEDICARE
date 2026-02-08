import mongoose from "mongoose";

const urineRoutineSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Physical Examination
        color: {
            type: String,
            enum: ["pale yellow", "yellow", "dark yellow", "amber", "red", "brown", "cloudy", "colorless"],
            default: "yellow"
        },
        appearance: {
            type: String,
            enum: ["clear", "slightly turbid", "turbid", "cloudy"],
            default: "clear"
        },
        specificGravity: { type: Number },                      // 1.001 - 1.035
        ph: { type: Number },                                   // 4.5 - 8.0

        // Chemical Examination
        protein: {
            type: String,
            enum: ["negative", "trace", "1+", "2+", "3+", "4+"],
            default: "negative"
        },
        glucose: {
            type: String,
            enum: ["negative", "trace", "1+", "2+", "3+", "4+"],
            default: "negative"
        },
        ketones: {
            type: String,
            enum: ["negative", "trace", "small", "moderate", "large"],
            default: "negative"
        },
        bilirubin: {
            type: String,
            enum: ["negative", "1+", "2+", "3+"],
            default: "negative"
        },
        urobilinogen: {
            type: String,
            enum: ["normal", "1+", "2+", "3+", "4+"],
            default: "normal"
        },
        blood: {
            type: String,
            enum: ["negative", "trace", "small", "moderate", "large"],
            default: "negative"
        },
        nitrite: {
            type: String,
            enum: ["negative", "positive"],
            default: "negative"
        },
        leukocyteEsterase: {
            type: String,
            enum: ["negative", "trace", "1+", "2+", "3+"],
            default: "negative"
        },

        // Microscopic Examination
        microscopic: {
            wbc: { type: String, default: "0-5 /HPF" },           // per High Power Field
            rbc: { type: String, default: "0-2 /HPF" },           // per High Power Field
            epithelialCells: {
                type: String,
                enum: ["few", "moderate", "many"],
                default: "few"
            },
            casts: {
                type: String,
                enum: ["none", "hyaline", "granular", "waxy", "rbc", "wbc"],
                default: "none"
            },
            crystals: {
                type: String,
                default: "none"
            },
            bacteria: {
                type: String,
                enum: ["none", "few", "moderate", "many"],
                default: "none"
            },
            yeast: {
                type: String,
                enum: ["none", "present"],
                default: "none"
            }
        },

        // Reference Ranges
        referenceRange: {
            specificGravity: { type: String, default: "1.005–1.030" },
            ph: { type: String, default: "4.5–8.0" },
            protein: { type: String, default: "Negative" },
            glucose: { type: String, default: "Negative" },
            wbc: { type: String, default: "0–5 /HPF" },
            rbc: { type: String, default: "0–2 /HPF" }
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

const UrineRoutine = mongoose.model("UrineRoutine", urineRoutineSchema);

export default UrineRoutine;
