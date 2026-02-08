import mongoose from "mongoose";

const ironStudiesSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Iron Parameters
        serumIron: { type: Number, required: true },            // μg/dL
        tibc: { type: Number, required: true },                 // μg/dL (Total Iron Binding Capacity)
        uibc: { type: Number },                                 // μg/dL (Unsaturated Iron Binding Capacity)
        transferrinSaturation: { type: Number },                // %
        ferritin: { type: Number, required: true },             // ng/mL
        transferrin: { type: Number },                          // mg/dL

        // Reference Ranges
        referenceRange: {
            serumIron: { type: String, default: "Male: 65–175 μg/dL, Female: 50–170 μg/dL" },
            tibc: { type: String, default: "250–400 μg/dL" },
            uibc: { type: String, default: "150–300 μg/dL" },
            transferrinSaturation: { type: String, default: "20–50%" },
            ferritin: { type: String, default: "Male: 20–250 ng/mL, Female: 10–120 ng/mL" },
            transferrin: { type: String, default: "200–360 mg/dL" }
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

// Calculate UIBC and Transferrin Saturation
ironStudiesSchema.pre("save", function (next) {
    // UIBC = TIBC - Serum Iron
    if (this.tibc && this.serumIron) {
        this.uibc = this.tibc - this.serumIron;
    }

    // Transferrin Saturation = (Serum Iron / TIBC) × 100
    if (this.serumIron && this.tibc) {
        this.transferrinSaturation = parseFloat(((this.serumIron / this.tibc) * 100).toFixed(2));
    }

    next();
});

const IronStudies = mongoose.model("IronStudies", ironStudiesSchema);

export default IronStudies;
