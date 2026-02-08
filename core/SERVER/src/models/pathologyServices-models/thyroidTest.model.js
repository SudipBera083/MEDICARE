import mongoose from "mongoose";

const thyroidTestSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    t3: { type: Number, required: true },     // Triiodothyronine (ng/dL)
    t4: { type: Number, required: true },     // Thyroxine (μg/dL)
    tsh: { type: Number, required: true },    // Thyroid Stimulating Hormone (μIU/mL)

    // Reference ranges
    referenceRange: {
      t3: { type: String, default: "80 – 200 ng/dL" },
      t4: { type: String, default: "5.0 – 12.0 μg/dL" },
      tsh: { type: String, default: "0.4 – 4.0 μIU/mL" }
    },

    // For billing connection
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

const ThyroidTest = mongoose.model("ThyroidTest", thyroidTestSchema);

export default ThyroidTest;
