import mongoose from "mongoose";

const electrolytePanelSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Major Electrolytes
        sodium: { type: Number, required: true },               // mEq/L
        potassium: { type: Number, required: true },            // mEq/L
        chloride: { type: Number, required: true },             // mEq/L
        bicarbonate: { type: Number },                          // mEq/L (CO2)

        // Minerals
        calcium: { type: Number },                              // mg/dL (Total Calcium)
        ionizedCalcium: { type: Number },                       // mmol/L
        magnesium: { type: Number },                            // mg/dL
        phosphorus: { type: Number },                           // mg/dL

        // Calculated Values
        anionGap: { type: Number },                             // mEq/L
        osmolality: { type: Number },                           // mOsm/kg (calculated)

        // Reference Ranges
        referenceRange: {
            sodium: { type: String, default: "136–145 mEq/L" },
            potassium: { type: String, default: "3.5–5.0 mEq/L" },
            chloride: { type: String, default: "98–106 mEq/L" },
            bicarbonate: { type: String, default: "22–29 mEq/L" },
            calcium: { type: String, default: "8.5–10.5 mg/dL" },
            ionizedCalcium: { type: String, default: "1.12–1.32 mmol/L" },
            magnesium: { type: String, default: "1.7–2.2 mg/dL" },
            phosphorus: { type: String, default: "2.5–4.5 mg/dL" },
            anionGap: { type: String, default: "8–12 mEq/L (without K+)" }
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

// Calculate Anion Gap
electrolytePanelSchema.pre("save", function (next) {
    // Anion Gap = Na+ - (Cl- + HCO3-)
    if (this.sodium && this.chloride && this.bicarbonate) {
        this.anionGap = this.sodium - (this.chloride + this.bicarbonate);
    }
    next();
});

const ElectrolytePanel = mongoose.model("ElectrolytePanel", electrolytePanelSchema);

export default ElectrolytePanel;
