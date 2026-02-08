import mongoose from "mongoose";

const bloodSugarSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Test Type
        testType: {
            type: String,
            required: true,
            enum: ["fasting", "postPrandial", "random", "hba1c", "ogtt", "complete"]
        },

        // Blood Sugar Values
        fastingBloodSugar: { type: Number },                    // mg/dL (FBS)
        postPrandialBloodSugar: { type: Number },               // mg/dL (PPBS - 2 hours after meal)
        randomBloodSugar: { type: Number },                     // mg/dL (RBS)
        hba1c: { type: Number },                                // % (Glycated Hemoglobin)

        // OGTT Values (Oral Glucose Tolerance Test)
        ogtt: {
            fasting: { type: Number },                            // mg/dL
            oneHour: { type: Number },                            // mg/dL
            twoHour: { type: Number }                             // mg/dL
        },

        // Estimated Average Glucose (from HbA1c)
        estimatedAverageGlucose: { type: Number },              // mg/dL

        // Reference Ranges
        referenceRange: {
            fastingBloodSugar: { type: String, default: "Normal: 70–100 mg/dL, Pre-diabetic: 100–125, Diabetic: ≥126" },
            postPrandialBloodSugar: { type: String, default: "Normal: <140 mg/dL, Pre-diabetic: 140–199, Diabetic: ≥200" },
            randomBloodSugar: { type: String, default: "Normal: <140 mg/dL, Diabetic: ≥200 (with symptoms)" },
            hba1c: { type: String, default: "Normal: <5.7%, Pre-diabetic: 5.7–6.4%, Diabetic: ≥6.5%" },
            ogtt: { type: String, default: "2-hr: Normal: <140, Pre-diabetic: 140–199, Diabetic: ≥200 mg/dL" }
        },

        // Sample Time
        sampleCollectionTime: { type: Date },
        lastMealTime: { type: Date },

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

// Calculate estimated average glucose from HbA1c
bloodSugarSchema.pre("save", function (next) {
    // eAG = (28.7 × HbA1c) − 46.7
    if (this.hba1c) {
        this.estimatedAverageGlucose = parseFloat((28.7 * this.hba1c - 46.7).toFixed(2));
    }
    next();
});

const BloodSugar = mongoose.model("BloodSugar", bloodSugarSchema);

export default BloodSugar;
