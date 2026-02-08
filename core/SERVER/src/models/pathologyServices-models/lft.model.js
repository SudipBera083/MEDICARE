import mongoose from "mongoose";

const lftSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Bilirubin
        bilirubinTotal: { type: Number, required: true },       // mg/dL
        bilirubinDirect: { type: Number, required: true },      // mg/dL
        bilirubinIndirect: { type: Number },                    // mg/dL (calculated)

        // Liver Enzymes
        sgot: { type: Number, required: true },                 // U/L (AST - Aspartate Aminotransferase)
        sgpt: { type: Number, required: true },                 // U/L (ALT - Alanine Aminotransferase)
        alp: { type: Number, required: true },                  // U/L (Alkaline Phosphatase)
        ggt: { type: Number },                                  // U/L (Gamma-Glutamyl Transferase)

        // Proteins
        totalProtein: { type: Number, required: true },         // g/dL
        albumin: { type: Number, required: true },              // g/dL
        globulin: { type: Number },                             // g/dL (calculated)
        agRatio: { type: Number },                              // Albumin/Globulin Ratio

        // Reference Ranges
        referenceRange: {
            bilirubinTotal: { type: String, default: "0.3–1.2 mg/dL" },
            bilirubinDirect: { type: String, default: "0.0–0.3 mg/dL" },
            bilirubinIndirect: { type: String, default: "0.2–0.9 mg/dL" },
            sgot: { type: String, default: "8–45 U/L" },
            sgpt: { type: String, default: "7–56 U/L" },
            alp: { type: String, default: "44–147 U/L" },
            ggt: { type: String, default: "Male: 8–61 U/L, Female: 5–36 U/L" },
            totalProtein: { type: String, default: "6.0–8.3 g/dL" },
            albumin: { type: String, default: "3.5–5.0 g/dL" },
            globulin: { type: String, default: "2.0–3.5 g/dL" },
            agRatio: { type: String, default: "1.1–2.5" }
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

// Calculate indirect bilirubin and globulin before save
lftSchema.pre("save", function (next) {
    if (this.bilirubinTotal && this.bilirubinDirect) {
        this.bilirubinIndirect = this.bilirubinTotal - this.bilirubinDirect;
    }
    if (this.totalProtein && this.albumin) {
        this.globulin = this.totalProtein - this.albumin;
        if (this.globulin > 0) {
            this.agRatio = parseFloat((this.albumin / this.globulin).toFixed(2));
        }
    }
    next();
});

const LFT = mongoose.model("LFT", lftSchema);

export default LFT;
