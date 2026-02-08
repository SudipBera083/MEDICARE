import mongoose from "mongoose";

const ecgSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        // ECG Parameters
        heartRate: { type: Number, required: true },            // bpm

        rhythm: {
            type: String,
            enum: [
                "normal sinus rhythm", "sinus bradycardia", "sinus tachycardia",
                "sinus arrhythmia", "atrial fibrillation", "atrial flutter",
                "svt", "ventricular tachycardia", "ventricular fibrillation",
                "first degree av block", "second degree av block type 1",
                "second degree av block type 2", "complete heart block",
                "paced rhythm", "other"
            ],
            required: true
        },

        // Intervals
        prInterval: { type: Number },                           // ms
        qrsDuration: { type: Number },                          // ms
        qtInterval: { type: Number },                           // ms
        qtcInterval: { type: Number },                          // ms (corrected QT)

        // Axis
        axis: {
            type: String,
            enum: ["normal", "left axis deviation", "right axis deviation", "extreme axis", "indeterminate"]
        },

        // Waveform Analysis
        pWave: { type: String },
        qrsComplex: { type: String },
        stSegment: {
            type: String,
            enum: ["normal", "elevated", "depressed", "variable"]
        },
        tWave: {
            type: String,
            enum: ["normal", "inverted", "tall", "flattened", "biphasic"]
        },

        // ST Segment Details
        stChanges: [{
            lead: { type: String },
            change: { type: String, enum: ["elevation", "depression"] },
            mm: { type: Number }
        }],

        // Findings
        findings: [{ type: String }],

        // Common Abnormalities
        abnormalities: {
            lvh: { type: Boolean, default: false },               // Left Ventricular Hypertrophy
            rvh: { type: Boolean, default: false },               // Right Ventricular Hypertrophy
            lbbb: { type: Boolean, default: false },              // Left Bundle Branch Block
            rbbb: { type: Boolean, default: false },              // Right Bundle Branch Block
            lafb: { type: Boolean, default: false },              // Left Anterior Fascicular Block
            lpfb: { type: Boolean, default: false },              // Left Posterior Fascicular Block
            wpw: { type: Boolean, default: false },               // Wolff-Parkinson-White
            mi: { type: Boolean, default: false },                // Myocardial Infarction pattern
            ischemia: { type: Boolean, default: false },
            pericarditis: { type: Boolean, default: false }
        },

        // Interpretation
        interpretation: { type: String, required: true },

        // Clinical Correlation
        clinicalCorrelation: { type: String },

        // Reference Ranges
        referenceRange: {
            heartRate: { type: String, default: "60–100 bpm" },
            prInterval: { type: String, default: "120–200 ms" },
            qrsDuration: { type: String, default: "80–120 ms" },
            qtcInterval: { type: String, default: "Male: <450 ms, Female: <460 ms" }
        },

        // Quality
        quality: {
            type: String,
            enum: ["good", "fair", "poor", "artifact"],
            default: "good"
        },

        // Images
        imageUrls: [{ type: String }],

        // Reporting
        reportedBy: { type: String },
        reportedDate: { type: Date, default: Date.now },

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

// Calculate QTc using Bazett's formula
ecgSchema.pre("save", function (next) {
    if (this.qtInterval && this.heartRate) {
        // RR interval in seconds
        const rrInterval = 60 / this.heartRate;
        // QTc = QT / √RR (Bazett's formula)
        this.qtcInterval = Math.round(this.qtInterval / Math.sqrt(rrInterval));
    }
    next();
});

const ECG = mongoose.model("ECG", ecgSchema);

export default ECG;
