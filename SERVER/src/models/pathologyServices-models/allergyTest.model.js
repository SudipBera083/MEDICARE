import mongoose from "mongoose";

const allergyTestSchema = new mongoose.Schema(
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
            enum: ["total-ige", "specific-ige", "skin-prick", "patch-test", "food-panel", "inhalant-panel", "drug-allergy"]
        },

        // Total IgE
        totalIgE: { type: Number },                             // IU/mL

        // Specific IgE Classes
        // Class 0: <0.35 (Negative), Class 1: 0.35-0.70 (Low), Class 2: 0.71-3.50 (Moderate)
        // Class 3: 3.51-17.50 (High), Class 4: 17.51-50 (Very High), Class 5: 50.01-100 (Very High), Class 6: >100 (Very High)

        // Food Allergens
        foodAllergens: [{
            allergen: { type: String },
            value: { type: Number },                              // kU/L
            class: { type: Number, min: 0, max: 6 },
            interpretation: { type: String, enum: ["negative", "low", "moderate", "high", "very high"] }
        }],

        // Inhalant Allergens
        inhalantAllergens: [{
            allergen: { type: String },
            value: { type: Number },
            class: { type: Number, min: 0, max: 6 },
            interpretation: { type: String, enum: ["negative", "low", "moderate", "high", "very high"] }
        }],

        // Common Panels
        commonFoodPanel: {
            milk: { value: { type: Number }, class: { type: Number } },
            egg: { value: { type: Number }, class: { type: Number } },
            wheat: { value: { type: Number }, class: { type: Number } },
            peanut: { value: { type: Number }, class: { type: Number } },
            soy: { value: { type: Number }, class: { type: Number } },
            fish: { value: { type: Number }, class: { type: Number } },
            shellfish: { value: { type: Number }, class: { type: Number } },
            treeNuts: { value: { type: Number }, class: { type: Number } },
            sesame: { value: { type: Number }, class: { type: Number } }
        },

        commonInhalantPanel: {
            dustMite: { value: { type: Number }, class: { type: Number } },
            catDander: { value: { type: Number }, class: { type: Number } },
            dogDander: { value: { type: Number }, class: { type: Number } },
            cockroach: { value: { type: Number }, class: { type: Number } },
            mold: { value: { type: Number }, class: { type: Number } },
            grass: { value: { type: Number }, class: { type: Number } },
            ragweed: { value: { type: Number }, class: { type: Number } },
            treePollen: { value: { type: Number }, class: { type: Number } }
        },

        // Drug Allergy
        drugAllergy: [{
            drug: { type: String },
            testMethod: { type: String, enum: ["specific-ige", "skin-test", "challenge-test"] },
            result: { type: String, enum: ["positive", "negative", "inconclusive"] }
        }],

        // Skin Prick Test Results
        skinPrickTest: [{
            allergen: { type: String },
            whealSize: { type: Number },                          // mm
            flareSize: { type: Number },                          // mm
            interpretation: { type: String, enum: ["negative", "positive", "strongly positive"] }
        }],

        // Reference Ranges
        referenceRange: {
            totalIgE: { type: String, default: "Adults: 0–100 IU/mL, Children vary by age" },
            specificIgE: { type: String, default: "Class 0 (<0.35): Negative, Class 1-2: Low-Moderate, Class 3-6: High-Very High" }
        },

        // Clinical History
        clinicalHistory: { type: String },
        suspectedAllergens: [{ type: String }],

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

const AllergyTest = mongoose.model("AllergyTest", allergyTestSchema);

export default AllergyTest;
