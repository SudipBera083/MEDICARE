import mongoose from "mongoose";

const vitaminTestSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Vitamin D
        vitaminD3: { type: Number },                            // ng/mL (25-Hydroxyvitamin D)
        vitaminD2: { type: Number },                            // ng/mL
        totalVitaminD: { type: Number },                        // ng/mL

        // Vitamin B Complex
        vitaminB12: { type: Number },                           // pg/mL
        folate: { type: Number },                               // ng/mL (Folic Acid / Vitamin B9)
        vitaminB1: { type: Number },                            // nmol/L (Thiamine)
        vitaminB6: { type: Number },                            // ng/mL (Pyridoxine)

        // Other Vitamins
        vitaminA: { type: Number },                             // μg/dL (Retinol)
        vitaminE: { type: Number },                             // mg/L (Tocopherol)
        vitaminC: { type: Number },                             // mg/dL (Ascorbic Acid)
        vitaminK: { type: Number },                             // ng/mL

        // Reference Ranges
        referenceRange: {
            vitaminD3: { type: String, default: "Deficient: <20, Insufficient: 20–29, Sufficient: 30–100, Toxic: >100 ng/mL" },
            vitaminB12: { type: String, default: "Normal: 200–900 pg/mL, Deficient: <200" },
            folate: { type: String, default: "Normal: 2.7–17.0 ng/mL" },
            vitaminB1: { type: String, default: "70–180 nmol/L" },
            vitaminB6: { type: String, default: "5–50 ng/mL" },
            vitaminA: { type: String, default: "20–80 μg/dL" },
            vitaminE: { type: String, default: "5.5–17.0 mg/L" },
            vitaminC: { type: String, default: "0.4–2.0 mg/dL" },
            vitaminK: { type: String, default: "0.1–2.2 ng/mL" }
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

// Calculate total Vitamin D
vitaminTestSchema.pre("save", function (next) {
    if (this.vitaminD2 && this.vitaminD3) {
        this.totalVitaminD = this.vitaminD2 + this.vitaminD3;
    } else if (this.vitaminD3 && !this.vitaminD2) {
        this.totalVitaminD = this.vitaminD3;
    }
    next();
});

const VitaminTest = mongoose.model("VitaminTest", vitaminTestSchema);

export default VitaminTest;
