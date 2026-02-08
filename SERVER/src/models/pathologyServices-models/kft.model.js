import mongoose from "mongoose";

const kftSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Kidney Function Parameters
        bloodUrea: { type: Number, required: true },            // mg/dL
        serumCreatinine: { type: Number, required: true },      // mg/dL
        bun: { type: Number },                                  // mg/dL (Blood Urea Nitrogen)
        uricAcid: { type: Number, required: true },             // mg/dL

        // eGFR Calculation
        egfr: { type: Number },                                 // mL/min/1.73m²

        // Additional Parameters (if needed)
        bunCreatinineRatio: { type: Number },                   // Ratio

        // Patient data for eGFR calculation
        patientAge: { type: Number },
        patientGender: { type: String, enum: ["male", "female"] },

        // Reference Ranges
        referenceRange: {
            bloodUrea: { type: String, default: "15–45 mg/dL" },
            serumCreatinine: { type: String, default: "Male: 0.7–1.3 mg/dL, Female: 0.6–1.1 mg/dL" },
            bun: { type: String, default: "7–20 mg/dL" },
            uricAcid: { type: String, default: "Male: 3.4–7.0 mg/dL, Female: 2.4–6.0 mg/dL" },
            egfr: { type: String, default: ">90 mL/min/1.73m² (Normal)" },
            bunCreatinineRatio: { type: String, default: "10:1 to 20:1" }
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

// Calculate BUN and eGFR before save
kftSchema.pre("save", function (next) {
    // BUN = Blood Urea / 2.14
    if (this.bloodUrea) {
        this.bun = parseFloat((this.bloodUrea / 2.14).toFixed(2));
    }

    // BUN/Creatinine Ratio
    if (this.bun && this.serumCreatinine) {
        this.bunCreatinineRatio = parseFloat((this.bun / this.serumCreatinine).toFixed(2));
    }

    // eGFR using CKD-EPI formula (simplified)
    if (this.serumCreatinine && this.patientAge && this.patientGender) {
        const k = this.patientGender === "female" ? 0.7 : 0.9;
        const a = this.patientGender === "female" ? -0.329 : -0.411;
        const scr = this.serumCreatinine / k;
        const min = Math.min(scr, 1);
        const max = Math.max(scr, 1);
        let egfr = 141 * Math.pow(min, a) * Math.pow(max, -1.209) * Math.pow(0.993, this.patientAge);
        if (this.patientGender === "female") egfr *= 1.018;
        this.egfr = parseFloat(egfr.toFixed(2));
    }

    next();
});

const KFT = mongoose.model("KFT", kftSchema);

export default KFT;
