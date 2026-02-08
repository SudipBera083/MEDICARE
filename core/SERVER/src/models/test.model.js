import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    testCode: {
        type: String,
        unique: true,
        uppercase: true,
        trim: true
    },
    testCategory: {
        type: String,
        required: true,
        enum: [
            "Blood Test",
            "Urine Test",
            "Stool Test",
            "Imaging",
            "Cardiac",
            "Hormonal",
            "Thyroid",
            "Cancer Markers",
            "Infectious Disease",
            "Allergy",
            "Other"
        ]
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    turnaroundTime: {
        type: String,  // e.g., "24 hours", "2-3 days"
        default: "24 hours"
    },
    sampleType: {
        type: String,  // e.g., "Blood", "Urine", "Stool", "N/A"
        default: "Blood"
    },
    fastingRequired: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Test = mongoose.model("Test", testSchema);

export default Test;
