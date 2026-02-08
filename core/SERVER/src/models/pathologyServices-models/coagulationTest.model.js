import mongoose from "mongoose";

const coagulationTestSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Prothrombin Time
        pt: { type: Number },                                   // seconds
        ptControl: { type: Number },                            // seconds
        inr: { type: Number },                                  // International Normalized Ratio

        // Activated Partial Thromboplastin Time
        aptt: { type: Number },                                 // seconds
        apttControl: { type: Number },                          // seconds
        apttRatio: { type: Number },

        // Thrombin Time
        tt: { type: Number },                                   // seconds

        // Fibrinogen
        fibrinogen: { type: Number },                           // mg/dL

        // D-Dimer
        dDimer: { type: Number },                               // μg/mL FEU or ng/mL DDU
        dDimerUnit: { type: String, enum: ["FEU", "DDU"], default: "FEU" },

        // Bleeding Time
        bleedingTime: { type: Number },                         // minutes

        // Clotting Time
        clottingTime: { type: Number },                         // minutes

        // Factor Assays
        factorAssays: {
            factorVIII: { type: Number },                         // %
            factorIX: { type: Number },                           // %
            factorXI: { type: Number },                           // %
            factorVII: { type: Number },                          // %
            factorX: { type: Number },                            // %
            factorV: { type: Number },                            // %
            factorII: { type: Number }                            // %
        },

        // Mixing Studies
        mixingStudy: {
            performed: { type: Boolean, default: false },
            immediate: { type: String },
            incubated: { type: String },
            interpretation: { type: String }
        },

        // Anticoagulant Monitoring
        anticoagulantTherapy: {
            drug: { type: String, enum: ["warfarin", "heparin", "lmwh", "doac", "none"] },
            targetINR: { type: String },
            lastDose: { type: Date }
        },

        // Reference Ranges
        referenceRange: {
            pt: { type: String, default: "11–13.5 seconds" },
            inr: { type: String, default: "0.8–1.1 (Normal), 2–3 (Warfarin therapy)" },
            aptt: { type: String, default: "25–35 seconds" },
            tt: { type: String, default: "14–19 seconds" },
            fibrinogen: { type: String, default: "200–400 mg/dL" },
            dDimer: { type: String, default: "<0.5 μg/mL FEU" },
            bleedingTime: { type: String, default: "2–7 minutes" },
            clottingTime: { type: String, default: "4–9 minutes" }
        },

        // Clinical Indication
        clinicalIndication: { type: String },

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

// Calculate APTT Ratio
coagulationTestSchema.pre("save", function (next) {
    if (this.aptt && this.apttControl && this.apttControl > 0) {
        this.apttRatio = parseFloat((this.aptt / this.apttControl).toFixed(2));
    }
    next();
});

const CoagulationTest = mongoose.model("CoagulationTest", coagulationTestSchema);

export default CoagulationTest;
