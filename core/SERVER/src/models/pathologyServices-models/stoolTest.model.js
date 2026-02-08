import mongoose from "mongoose";

const stoolTestSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Physical Examination
        physical: {
            color: {
                type: String,
                enum: ["brown", "yellow", "green", "black", "red", "clay/pale", "tarry"],
                default: "brown"
            },
            consistency: {
                type: String,
                enum: ["formed", "soft", "loose", "watery", "hard", "mucoid"],
                default: "formed"
            },
            odor: {
                type: String,
                enum: ["normal", "foul", "offensive"],
                default: "normal"
            },
            mucus: {
                type: String,
                enum: ["absent", "present", "excessive"],
                default: "absent"
            },
            blood: {
                type: String,
                enum: ["absent", "present-fresh", "present-altered"],
                default: "absent"
            }
        },

        // Chemical Examination
        chemical: {
            occultBlood: {
                type: String,
                enum: ["negative", "positive"],
                required: true
            },
            ph: { type: Number },                                 // 6.0 - 8.0
            reducingSubstances: {
                type: String,
                enum: ["absent", "present"],
                default: "absent"
            },
            fecalFat: {
                type: String,
                enum: ["normal", "increased"],
                default: "normal"
            }
        },

        // Microscopic Examination
        microscopic: {
            wbc: { type: String, default: "0-5 /HPF" },
            rbc: { type: String, default: "0-2 /HPF" },
            ova: {
                present: { type: Boolean, default: false },
                type: { type: String }                              // Parasite species
            },
            cysts: {
                present: { type: Boolean, default: false },
                type: { type: String }
            },
            parasites: {
                present: { type: Boolean, default: false },
                type: { type: String }
            },
            fatGlobules: {
                type: String,
                enum: ["absent", "few", "moderate", "many"],
                default: "absent"
            },
            musclefibers: {
                type: String,
                enum: ["absent", "few", "moderate", "many"],
                default: "absent"
            },
            vegetableFibers: {
                type: String,
                enum: ["absent", "few", "moderate", "many"],
                default: "absent"
            },
            yeast: {
                type: String,
                enum: ["absent", "present"],
                default: "absent"
            }
        },

        // Common Parasites Found
        parasitesIdentified: [{
            type: String,
            enum: [
                "Entamoeba histolytica", "Giardia lamblia", "Cryptosporidium",
                "Ascaris lumbricoides", "Hookworm", "Enterobius vermicularis",
                "Trichuris trichiura", "Strongyloides", "Hymenolepis nana",
                "Taenia", "Other"
            ]
        }],

        // Stool Culture (if done)
        culture: {
            performed: { type: Boolean, default: false },
            result: { type: String, enum: ["no growth", "growth", "normal flora"] },
            organism: { type: String },
            sensitivity: [{
                antibiotic: { type: String },
                result: { type: String, enum: ["S", "I", "R"] }
            }]
        },

        // Fecal Calprotectin (IBD marker)
        fecalCalprotectin: { type: Number },                    // μg/g

        // H. pylori Stool Antigen
        hPyloriAntigen: {
            type: String,
            enum: ["positive", "negative", "not tested"],
            default: "not tested"
        },

        // Reference Ranges
        referenceRange: {
            occultBlood: { type: String, default: "Negative" },
            ph: { type: String, default: "6.0–8.0" },
            fecalCalprotectin: { type: String, default: "<50 μg/g (Normal), 50–200 (Borderline), >200 (Elevated)" },
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

const StoolTest = mongoose.model("StoolTest", stoolTestSchema);

export default StoolTest;
