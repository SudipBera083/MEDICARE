import mongoose from "mongoose";

const hormonalTestSchema = new mongoose.Schema(
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
            enum: ["fertility", "thyroid", "adrenal", "pituitary", "complete"]
        },

        // Fertility Hormones
        fsh: { type: Number },                                  // mIU/mL
        lh: { type: Number },                                   // mIU/mL
        prolactin: { type: Number },                            // ng/mL
        estradiol: { type: Number },                            // pg/mL (E2)
        progesterone: { type: Number },                         // ng/mL
        testosterone: { type: Number },                         // ng/dL
        freeTestosterone: { type: Number },                     // pg/mL
        amh: { type: Number },                                  // ng/mL (Anti-Mullerian Hormone)
        dheas: { type: Number },                                // μg/dL

        // Pituitary Hormones
        acth: { type: Number },                                 // pg/mL
        gh: { type: Number },                                   // ng/mL (Growth Hormone)
        igf1: { type: Number },                                 // ng/mL

        // Adrenal Hormones
        cortisol: { type: Number },                             // μg/dL
        cortisolAM: { type: Number },                           // μg/dL (Morning)
        cortisolPM: { type: Number },                           // μg/dL (Evening)
        aldosterone: { type: Number },                          // ng/dL

        // Other
        insulin: { type: Number },                              // μIU/mL
        cPeptide: { type: Number },                             // ng/mL
        homaIR: { type: Number },                               // HOMA-IR Index

        // Sample Info
        menstrualCycleDay: { type: Number },                    // For female patients
        sampleTime: { type: Date },

        // Reference Ranges
        referenceRange: {
            fsh: { type: String, default: "Male: 1.5–12.4, Female Follicular: 3.5–12.5, Ovulatory: 4.7–21.5, Luteal: 1.7–7.7, Postmenopausal: 25.8–134.8 mIU/mL" },
            lh: { type: String, default: "Male: 1.7–8.6, Female Follicular: 2.4–12.6, Ovulatory: 14–95.6, Luteal: 1–11.4, Postmenopausal: 7.7–58.5 mIU/mL" },
            prolactin: { type: String, default: "Male: 4–15.2, Female: 4.8–23.3 ng/mL" },
            estradiol: { type: String, default: "Male: 10–40, Female Follicular: 12.5–166, Ovulatory: 85–498, Luteal: 43.8–211, Postmenopausal: <6–54.7 pg/mL" },
            progesterone: { type: String, default: "Male: 0.2–1.4, Female Follicular: 0.2–1.5, Luteal: 1.7–27, Postmenopausal: <0.8 ng/mL" },
            testosterone: { type: String, default: "Male: 270–1070, Female: 15–70 ng/dL" },
            cortisol: { type: String, default: "AM (6–8am): 6.2–19.4, PM (4–6pm): 2.3–11.9 μg/dL" },
            insulin: { type: String, default: "Fasting: 2.6–24.9 μIU/mL" },
            homaIR: { type: String, default: "<2.5 (Normal), 2.5–5 (Early resistance), >5 (Significant resistance)" }
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

// Calculate HOMA-IR
hormonalTestSchema.pre("save", async function (next) {
    // HOMA-IR = (Fasting Insulin × Fasting Glucose) / 405
    // Note: Need glucose from BloodSugar test if linked
    if (this.insulin) {
        // Store insulin for potential HOMA-IR calculation elsewhere
    }
    next();
});

const HormonalTest = mongoose.model("HormonalTest", hormonalTestSchema);

export default HormonalTest;
