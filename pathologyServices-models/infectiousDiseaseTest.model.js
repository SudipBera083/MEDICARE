import mongoose from "mongoose";

const infectiousDiseaseTestSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Test Category
        testCategory: {
            type: String,
            required: true,
            enum: ["hepatitis", "hiv", "dengue", "malaria", "typhoid", "tb", "covid", "std", "other"]
        },

        // Hepatitis Panel
        hepatitis: {
            hbsAg: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            antiHBs: { type: Number },                            // mIU/mL
            antiHBc: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            hbeAg: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            antiHBe: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            hbvDna: { type: String },                             // IU/mL
            antiHCV: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            hcvRna: { type: String },                             // IU/mL
            hav: {
                igM: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
                igG: { type: String, enum: ["reactive", "non-reactive", "not tested"] }
            },
            hev: {
                igM: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
                igG: { type: String, enum: ["reactive", "non-reactive", "not tested"] }
            }
        },

        // HIV Tests
        hiv: {
            screening: { type: String, enum: ["reactive", "non-reactive", "indeterminate", "not tested"] },
            confirmatory: { type: String, enum: ["positive", "negative", "indeterminate", "not tested"] },
            p24Antigen: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            viralLoad: { type: String },                          // copies/mL
            cd4Count: { type: Number },                           // cells/μL
            cd4Percentage: { type: Number }                       // %
        },

        // Dengue Tests
        dengue: {
            ns1Antigen: { type: String, enum: ["positive", "negative", "not tested"] },
            igM: { type: String, enum: ["positive", "negative", "not tested"] },
            igG: { type: String, enum: ["positive", "negative", "not tested"] }
        },

        // Malaria Tests
        malaria: {
            rapidTest: { type: String, enum: ["positive", "negative", "not tested"] },
            species: { type: String, enum: ["P. vivax", "P. falciparum", "P. malariae", "P. ovale", "mixed", "none"] },
            smear: { type: String, enum: ["positive", "negative", "not tested"] },
            parasiteDensity: { type: String }
        },

        // Typhoid Tests
        typhoid: {
            widalTest: {
                typhi_O: { type: String },                          // Titer
                typhi_H: { type: String },
                paratyphi_AH: { type: String },
                paratyphi_BH: { type: String }
            },
            typhidot: {
                igM: { type: String, enum: ["positive", "negative", "not tested"] },
                igG: { type: String, enum: ["positive", "negative", "not tested"] }
            },
            bloodCulture: { type: String }
        },

        // Tuberculosis Tests
        tb: {
            mantouxTest: { type: Number },                        // mm induration
            igra: { type: String, enum: ["positive", "negative", "indeterminate", "not tested"] },
            afbSmear: { type: String, enum: ["positive", "negative", "not tested"] },
            geneXpert: { type: String, enum: ["MTB detected", "MTB not detected", "not tested"] },
            rifResistance: { type: String, enum: ["detected", "not detected", "indeterminate", "not applicable"] }
        },

        // COVID-19 Tests
        covid: {
            rtPcr: { type: String, enum: ["positive", "negative", "invalid", "not tested"] },
            rapidAntigen: { type: String, enum: ["positive", "negative", "not tested"] },
            antibodyIgM: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            antibodyIgG: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            ctValue: { type: Number }                             // Cycle threshold
        },

        // STD Panel
        std: {
            vdrl: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            tpha: { type: String, enum: ["reactive", "non-reactive", "not tested"] },
            rprTiter: { type: String },
            chlamydia: { type: String, enum: ["positive", "negative", "not tested"] },
            gonorrhea: { type: String, enum: ["positive", "negative", "not tested"] },
            herpes: {
                hsv1IgG: { type: String, enum: ["positive", "negative", "not tested"] },
                hsv2IgG: { type: String, enum: ["positive", "negative", "not tested"] }
            }
        },

        // Interpretation
        interpretation: { type: String },

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

const InfectiousDiseaseTest = mongoose.model("InfectiousDiseaseTest", infectiousDiseaseTestSchema);

export default InfectiousDiseaseTest;
