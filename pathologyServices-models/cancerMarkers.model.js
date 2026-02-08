import mongoose from "mongoose";

const cancerMarkersSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Prostate
        psa: { type: Number },                                  // ng/mL (Prostate Specific Antigen)
        freePsa: { type: Number },                              // ng/mL
        psaRatio: { type: Number },                             // % (Free/Total)

        // Gastrointestinal
        cea: { type: Number },                                  // ng/mL (Carcinoembryonic Antigen)
        ca199: { type: Number },                                // U/mL (Pancreatic/GI)
        afp: { type: Number },                                  // ng/mL (Alpha-Fetoprotein - Liver)

        // Gynecological
        ca125: { type: Number },                                // U/mL (Ovarian)
        ca153: { type: Number },                                // U/mL (Breast)
        he4: { type: Number },                                  // pmol/L (Ovarian)
        roma: { type: Number },                                 // % (Risk of Ovarian Malignancy Algorithm)

        // Breast
        her2Neu: { type: String },                              // Status
        brca1: { type: String },                                // Gene mutation status
        brca2: { type: String },                                // Gene mutation status

        // Thyroid
        calcitonin: { type: Number },                           // pg/mL (Thyroid Medullary)
        thyroglobulin: { type: Number },                        // ng/mL

        // Other
        ldh: { type: Number },                                  // U/L (Various cancers)
        beta2Microglobulin: { type: Number },                   // mg/L (Lymphoma, Myeloma)
        hcgBeta: { type: Number },                              // mIU/mL (Testicular, Trophoblastic)
        nsE: { type: Number },                                  // ng/mL (Neuron-Specific Enolase - Small cell lung)
        cyfra211: { type: Number },                             // ng/mL (Non-small cell lung)
        scc: { type: Number },                                  // ng/mL (Squamous Cell Carcinoma Antigen)

        // Clinical Context
        cancerType: { type: String },
        stage: { type: String },
        treatmentStatus: {
            type: String,
            enum: ["pre-treatment", "on-treatment", "post-treatment", "monitoring", "screening"]
        },

        // Reference Ranges
        referenceRange: {
            psa: { type: String, default: "Normal: <4.0 ng/mL, Age-adjusted varies" },
            psaRatio: { type: String, default: ">25% suggests benign, <15% suggests malignancy" },
            cea: { type: String, default: "Non-smoker: <3.0 ng/mL, Smoker: <5.0 ng/mL" },
            ca199: { type: String, default: "<37 U/mL" },
            afp: { type: String, default: "<10 ng/mL" },
            ca125: { type: String, default: "<35 U/mL" },
            ca153: { type: String, default: "<30 U/mL" },
            calcitonin: { type: String, default: "Male: <8.4 pg/mL, Female: <5.0 pg/mL" },
            hcgBeta: { type: String, default: "Male/Non-pregnant: <5 mIU/mL" }
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

// Calculate PSA ratio
cancerMarkersSchema.pre("save", function (next) {
    if (this.psa && this.freePsa && this.psa > 0) {
        this.psaRatio = parseFloat(((this.freePsa / this.psa) * 100).toFixed(2));
    }
    next();
});

const CancerMarkers = mongoose.model("CancerMarkers", cancerMarkersSchema);

export default CancerMarkers;
