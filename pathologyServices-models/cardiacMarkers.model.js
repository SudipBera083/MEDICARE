import mongoose from "mongoose";

const cardiacMarkersSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Troponins
        troponinI: { type: Number },                            // ng/mL
        troponinT: { type: Number },                            // ng/mL
        troponinIHS: { type: Number },                          // pg/mL (High Sensitivity)
        troponinTHS: { type: Number },                          // ng/L (High Sensitivity)

        // CK-MB
        ckMB: { type: Number },                                 // ng/mL
        totalCK: { type: Number },                              // U/L
        ckMBIndex: { type: Number },                            // % (CK-MB/Total CK × 100)

        // Natriuretic Peptides
        bnp: { type: Number },                                  // pg/mL (B-type Natriuretic Peptide)
        ntProBNP: { type: Number },                             // pg/mL

        // Other Markers
        myoglobin: { type: Number },                            // ng/mL
        ldh: { type: Number },                                  // U/L (Lactate Dehydrogenase)
        homocysteine: { type: Number },                         // μmol/L
        crp: { type: Number },                                  // mg/L (C-Reactive Protein)
        hsCRP: { type: Number },                                // mg/L (High Sensitivity CRP)
        dDimer: { type: Number },                               // μg/mL FEU

        // Clinical Context
        chestPainOnset: { type: Date },
        timeSinceSymptoms: { type: Number },                    // Hours

        // Interpretation Flags
        interpretation: {
            type: String,
            enum: ["normal", "elevated", "borderline", "significantly elevated", "critical"]
        },

        // Reference Ranges
        referenceRange: {
            troponinI: { type: String, default: "<0.04 ng/mL (99th percentile)" },
            troponinT: { type: String, default: "<0.01 ng/mL (99th percentile)" },
            troponinIHS: { type: String, default: "Male: <34.2 pg/mL, Female: <15.6 pg/mL (99th percentile)" },
            ckMB: { type: String, default: "<5.0 ng/mL" },
            ckMBIndex: { type: String, default: "<4% (>6% suggests MI)" },
            bnp: { type: String, default: "<100 pg/mL (HF unlikely), 100–400 (indeterminate), >400 (HF likely)" },
            ntProBNP: { type: String, default: "<300 pg/mL (HF unlikely)" },
            myoglobin: { type: String, default: "Male: 28–72 ng/mL, Female: 25–58 ng/mL" },
            ldh: { type: String, default: "140–280 U/L" },
            homocysteine: { type: String, default: "5–15 μmol/L" },
            hsCRP: { type: String, default: "<1 mg/L (Low risk), 1–3 (Average), >3 (High risk)" },
            dDimer: { type: String, default: "<0.5 μg/mL FEU" }
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

// Calculate CK-MB Index
cardiacMarkersSchema.pre("save", function (next) {
    if (this.ckMB && this.totalCK && this.totalCK > 0) {
        this.ckMBIndex = parseFloat(((this.ckMB / this.totalCK) * 100).toFixed(2));
    }
    next();
});

const CardiacMarkers = mongoose.model("CardiacMarkers", cardiacMarkersSchema);

export default CardiacMarkers;
