import mongoose from "mongoose";

const urineCultureSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Culture Results
        cultureResult: {
            type: String,
            enum: ["no growth", "growth", "mixed flora", "contaminated"],
            required: true
        },

        // Organism Details
        organism: { type: String },                             // Identified organism name
        colonyCount: { type: String },                          // CFU/mL

        // Significance
        significance: {
            type: String,
            enum: ["significant", "not significant", "probable contamination"],
            default: "not significant"
        },

        // Antibiotic Sensitivity
        sensitivity: [{
            antibiotic: { type: String },
            result: {
                type: String,
                enum: ["sensitive", "intermediate", "resistant"]
            },
            mic: { type: String }                                 // Minimum Inhibitory Concentration
        }],

        // Common Antibiotics Panel
        sensitivityPanel: {
            amoxicillin: { type: String, enum: ["S", "I", "R", "NT"] },
            amoxicillinClavulanate: { type: String, enum: ["S", "I", "R", "NT"] },
            ampicillin: { type: String, enum: ["S", "I", "R", "NT"] },
            ceftriaxone: { type: String, enum: ["S", "I", "R", "NT"] },
            cefixime: { type: String, enum: ["S", "I", "R", "NT"] },
            ciprofloxacin: { type: String, enum: ["S", "I", "R", "NT"] },
            levofloxacin: { type: String, enum: ["S", "I", "R", "NT"] },
            nitrofurantoin: { type: String, enum: ["S", "I", "R", "NT"] },
            cotrimoxazole: { type: String, enum: ["S", "I", "R", "NT"] },
            gentamicin: { type: String, enum: ["S", "I", "R", "NT"] },
            amikacin: { type: String, enum: ["S", "I", "R", "NT"] },
            meropenem: { type: String, enum: ["S", "I", "R", "NT"] },
            imipenem: { type: String, enum: ["S", "I", "R", "NT"] }
        },

        // Reference
        referenceRange: {
            colonyCount: { type: String, default: "Significant: ≥10⁵ CFU/mL, Possible UTI: 10³–10⁵ CFU/mL" }
        },

        // Incubation
        incubationPeriod: { type: Number, default: 48 },        // Hours

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

const UrineCulture = mongoose.model("UrineCulture", urineCultureSchema);

export default UrineCulture;
