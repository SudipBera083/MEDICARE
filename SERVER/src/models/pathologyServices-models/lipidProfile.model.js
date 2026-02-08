import mongoose from "mongoose";

const lipidProfileSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Lipid Parameters
        totalCholesterol: { type: Number, required: true },     // mg/dL
        hdl: { type: Number, required: true },                  // mg/dL (High-Density Lipoprotein)
        ldl: { type: Number },                                  // mg/dL (Low-Density Lipoprotein)
        vldl: { type: Number },                                 // mg/dL (Very Low-Density Lipoprotein)
        triglycerides: { type: Number, required: true },        // mg/dL

        // Calculated Ratios
        tcHdlRatio: { type: Number },                           // Total Cholesterol / HDL
        ldlHdlRatio: { type: Number },                          // LDL / HDL
        nonHdlCholesterol: { type: Number },                    // Total Cholesterol - HDL

        // Reference Ranges
        referenceRange: {
            totalCholesterol: { type: String, default: "Desirable: <200 mg/dL, Borderline: 200–239, High: ≥240" },
            hdl: { type: String, default: "Male: >40 mg/dL, Female: >50 mg/dL (Higher is better)" },
            ldl: { type: String, default: "Optimal: <100 mg/dL, Near optimal: 100–129, Borderline: 130–159, High: ≥160" },
            vldl: { type: String, default: "5–40 mg/dL" },
            triglycerides: { type: String, default: "Normal: <150 mg/dL, Borderline: 150–199, High: 200–499, Very High: ≥500" },
            tcHdlRatio: { type: String, default: "<5 (Lower is better)" },
            ldlHdlRatio: { type: String, default: "<3.5 (Lower is better)" }
        },

        // Fasting Status
        fastingStatus: {
            type: String,
            enum: ["fasting", "non-fasting"],
            default: "fasting"
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

// Calculate derived values before save
lipidProfileSchema.pre("save", function (next) {
    // VLDL = Triglycerides / 5 (Friedewald formula)
    if (this.triglycerides) {
        this.vldl = parseFloat((this.triglycerides / 5).toFixed(2));
    }

    // LDL = Total Cholesterol - HDL - VLDL (Friedewald formula)
    if (this.totalCholesterol && this.hdl && this.vldl) {
        this.ldl = parseFloat((this.totalCholesterol - this.hdl - this.vldl).toFixed(2));
    }

    // TC/HDL Ratio
    if (this.totalCholesterol && this.hdl) {
        this.tcHdlRatio = parseFloat((this.totalCholesterol / this.hdl).toFixed(2));
    }

    // LDL/HDL Ratio
    if (this.ldl && this.hdl) {
        this.ldlHdlRatio = parseFloat((this.ldl / this.hdl).toFixed(2));
    }

    // Non-HDL Cholesterol
    if (this.totalCholesterol && this.hdl) {
        this.nonHdlCholesterol = this.totalCholesterol - this.hdl;
    }

    next();
});

const LipidProfile = mongoose.model("LipidProfile", lipidProfileSchema);

export default LipidProfile;
