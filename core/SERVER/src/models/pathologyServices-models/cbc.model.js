import mongoose from "mongoose";

const cbcSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // Red Blood Cell Parameters
        hemoglobin: { type: Number, required: true },          // g/dL
        rbc: { type: Number, required: true },                  // million/μL
        pcv: { type: Number, required: true },                  // % (Packed Cell Volume / Hematocrit)
        mcv: { type: Number, required: true },                  // fL (Mean Corpuscular Volume)
        mch: { type: Number, required: true },                  // pg (Mean Corpuscular Hemoglobin)
        mchc: { type: Number, required: true },                 // g/dL (Mean Corpuscular Hemoglobin Concentration)
        rdw: { type: Number },                                  // % (Red Cell Distribution Width)

        // White Blood Cell Parameters
        wbc: { type: Number, required: true },                  // cells/μL (Total WBC Count)
        neutrophils: { type: Number },                          // %
        lymphocytes: { type: Number },                          // %
        monocytes: { type: Number },                            // %
        eosinophils: { type: Number },                          // %
        basophils: { type: Number },                            // %

        // Absolute Counts
        absoluteNeutrophils: { type: Number },                  // cells/μL
        absoluteLymphocytes: { type: Number },                  // cells/μL
        absoluteMonocytes: { type: Number },                    // cells/μL
        absoluteEosinophils: { type: Number },                  // cells/μL
        absoluteBasophils: { type: Number },                    // cells/μL

        // Platelet Parameters
        plateletCount: { type: Number, required: true },        // per μL
        mpv: { type: Number },                                  // fL (Mean Platelet Volume)
        pdw: { type: Number },                                  // % (Platelet Distribution Width)

        // Reference Ranges
        referenceRange: {
            hemoglobin: { type: String, default: "Male: 13.5–17.5 g/dL, Female: 12.0–16.0 g/dL" },
            rbc: { type: String, default: "Male: 4.5–5.5 M/μL, Female: 4.0–5.0 M/μL" },
            pcv: { type: String, default: "Male: 40–54%, Female: 36–48%" },
            mcv: { type: String, default: "80–100 fL" },
            mch: { type: String, default: "27–33 pg" },
            mchc: { type: String, default: "32–36 g/dL" },
            rdw: { type: String, default: "11.5–14.5%" },
            wbc: { type: String, default: "4,000–11,000 cells/μL" },
            neutrophils: { type: String, default: "40–70%" },
            lymphocytes: { type: String, default: "20–40%" },
            monocytes: { type: String, default: "2–8%" },
            eosinophils: { type: String, default: "1–4%" },
            basophils: { type: String, default: "0–1%" },
            plateletCount: { type: String, default: "150,000–400,000/μL" },
            mpv: { type: String, default: "7.5–11.5 fL" }
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

const CBC = mongoose.model("CBC", cbcSchema);

export default CBC;
