import mongoose from "mongoose";
import dotenv from "dotenv";
import Test from "./src/models/test.model.js";

dotenv.config();

const tests = [
    // ==================== BLOOD TESTS ====================
    { testName: "Complete Blood Count (CBC)", testCode: "CBC", testCategory: "Blood Test", price: 350, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets" },
    { testName: "Hemoglobin (Hb)", testCode: "HB", testCategory: "Blood Test", price: 150, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Measures the amount of hemoglobin in blood" },
    { testName: "Erythrocyte Sedimentation Rate (ESR)", testCode: "ESR", testCategory: "Blood Test", price: 150, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Measures inflammation in the body" },
    { testName: "Blood Group & Rh Typing", testCode: "BGT", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Determines blood group (A, B, AB, O) and Rh factor" },
    { testName: "Peripheral Blood Smear", testCode: "PBS", testCategory: "Blood Test", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Examines blood cells under microscope" },
    { testName: "Reticulocyte Count", testCode: "RET", testCategory: "Blood Test", price: 250, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Measures immature red blood cells" },

    // ==================== LIVER FUNCTION TESTS ====================
    { testName: "Liver Function Test (LFT)", testCode: "LFT", testCategory: "Blood Test", price: 600, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Complete liver panel including SGOT, SGPT, Bilirubin, Albumin, ALP" },
    { testName: "SGOT (AST)", testCode: "SGOT", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Liver enzyme test" },
    { testName: "SGPT (ALT)", testCode: "SGPT", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Liver enzyme test" },
    { testName: "Bilirubin (Total & Direct)", testCode: "BIL", testCategory: "Blood Test", price: 250, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Measures bilirubin levels" },
    { testName: "Alkaline Phosphatase (ALP)", testCode: "ALP", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Liver and bone enzyme" },
    { testName: "Gamma GT (GGT)", testCode: "GGT", testCategory: "Blood Test", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Liver enzyme test" },
    { testName: "Serum Protein & Albumin", testCode: "SPA", testCategory: "Blood Test", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Measures protein levels" },

    // ==================== KIDNEY FUNCTION TESTS ====================
    { testName: "Kidney Function Test (KFT)", testCode: "KFT", testCategory: "Blood Test", price: 600, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Complete kidney panel including Urea, Creatinine, Uric Acid" },
    { testName: "Blood Urea", testCode: "UREA", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Measures urea nitrogen in blood" },
    { testName: "Serum Creatinine", testCode: "CREAT", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Kidney function marker" },
    { testName: "Blood Urea Nitrogen (BUN)", testCode: "BUN", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Kidney function test" },
    { testName: "Uric Acid", testCode: "UA", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Measures uric acid levels" },
    { testName: "eGFR (Estimated GFR)", testCode: "EGFR", testCategory: "Blood Test", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Estimates kidney filtration rate" },

    // ==================== LIPID PROFILE ====================
    { testName: "Lipid Profile (Complete)", testCode: "LIPID", testCategory: "Blood Test", price: 600, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Complete cholesterol panel - Total, HDL, LDL, VLDL, Triglycerides" },
    { testName: "Total Cholesterol", testCode: "CHOL", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Total cholesterol level" },
    { testName: "HDL Cholesterol", testCode: "HDL", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Good cholesterol" },
    { testName: "LDL Cholesterol", testCode: "LDL", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Bad cholesterol" },
    { testName: "Triglycerides", testCode: "TG", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Fat levels in blood" },
    { testName: "VLDL Cholesterol", testCode: "VLDL", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Very low density lipoprotein" },

    // ==================== BLOOD SUGAR TESTS ====================
    { testName: "Fasting Blood Sugar (FBS)", testCode: "FBS", testCategory: "Blood Test", price: 100, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Blood glucose after 8-12 hours fasting" },
    { testName: "Post Prandial Blood Sugar (PPBS)", testCode: "PPBS", testCategory: "Blood Test", price: 100, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Blood glucose 2 hours after meal" },
    { testName: "Random Blood Sugar (RBS)", testCode: "RBS", testCategory: "Blood Test", price: 100, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Blood glucose at any time" },
    { testName: "HbA1c (Glycated Hemoglobin)", testCode: "HBA1C", testCategory: "Blood Test", price: 500, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "3-month average blood sugar" },
    { testName: "Glucose Tolerance Test (GTT)", testCode: "GTT", testCategory: "Blood Test", price: 400, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Diabetes screening test" },
    { testName: "Fructosamine", testCode: "FRUCT", testCategory: "Blood Test", price: 600, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "2-3 week average blood sugar" },

    // ==================== THYROID TESTS ====================
    { testName: "Thyroid Profile (T3, T4, TSH)", testCode: "TFT", testCategory: "Thyroid", price: 600, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Complete thyroid function test" },
    { testName: "TSH (Thyroid Stimulating Hormone)", testCode: "TSH", testCategory: "Thyroid", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Primary thyroid screening test" },
    { testName: "T3 (Triiodothyronine)", testCode: "T3", testCategory: "Thyroid", price: 250, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Thyroid hormone level" },
    { testName: "T4 (Thyroxine)", testCode: "T4", testCategory: "Thyroid", price: 250, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Thyroid hormone level" },
    { testName: "Free T3", testCode: "FT3", testCategory: "Thyroid", price: 350, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Free triiodothyronine" },
    { testName: "Free T4", testCode: "FT4", testCategory: "Thyroid", price: 350, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Free thyroxine" },
    { testName: "Anti-TPO Antibody", testCode: "TPO", testCategory: "Thyroid", price: 800, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Thyroid autoimmune test" },

    // ==================== VITAMIN & MINERAL TESTS ====================
    { testName: "Vitamin D (25-OH)", testCode: "VITD", testCategory: "Blood Test", price: 1200, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Vitamin D deficiency test" },
    { testName: "Vitamin B12", testCode: "B12", testCategory: "Blood Test", price: 800, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Vitamin B12 level" },
    { testName: "Folic Acid (Folate)", testCode: "FOL", testCategory: "Blood Test", price: 700, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Vitamin B9 level" },
    { testName: "Iron Studies (Serum Iron, TIBC, Ferritin)", testCode: "IRON", testCategory: "Blood Test", price: 900, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: true, description: "Complete iron panel" },
    { testName: "Serum Ferritin", testCode: "FER", testCategory: "Blood Test", price: 500, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Iron storage protein" },
    { testName: "Serum Calcium", testCode: "CA", testCategory: "Blood Test", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Calcium level" },
    { testName: "Serum Magnesium", testCode: "MG", testCategory: "Blood Test", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Magnesium level" },
    { testName: "Serum Zinc", testCode: "ZN", testCategory: "Blood Test", price: 500, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Zinc level" },

    // ==================== ELECTROLYTE PANEL ====================
    { testName: "Electrolyte Panel (Na, K, Cl)", testCode: "ELEC", testCategory: "Blood Test", price: 400, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Sodium, Potassium, Chloride" },
    { testName: "Serum Sodium", testCode: "NA", testCategory: "Blood Test", price: 150, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Sodium level" },
    { testName: "Serum Potassium", testCode: "K", testCategory: "Blood Test", price: 150, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Potassium level" },
    { testName: "Serum Chloride", testCode: "CL", testCategory: "Blood Test", price: 150, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Chloride level" },

    // ==================== CARDIAC MARKERS ====================
    { testName: "Cardiac Profile", testCode: "CARD", testCategory: "Cardiac", price: 2500, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Troponin, CK-MB, LDH, Myoglobin" },
    { testName: "Troponin I", testCode: "TROPI", testCategory: "Cardiac", price: 1000, sampleType: "Blood", turnaroundTime: "4 hours", fastingRequired: false, description: "Heart attack marker" },
    { testName: "Troponin T", testCode: "TROPT", testCategory: "Cardiac", price: 1000, sampleType: "Blood", turnaroundTime: "4 hours", fastingRequired: false, description: "Heart attack marker" },
    { testName: "CK-MB", testCode: "CKMB", testCategory: "Cardiac", price: 600, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Heart muscle enzyme" },
    { testName: "CPK (Creatine Phosphokinase)", testCode: "CPK", testCategory: "Cardiac", price: 400, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Muscle enzyme" },
    { testName: "LDH (Lactate Dehydrogenase)", testCode: "LDH", testCategory: "Cardiac", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Tissue damage marker" },
    { testName: "BNP (B-type Natriuretic Peptide)", testCode: "BNP", testCategory: "Cardiac", price: 1500, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Heart failure marker" },
    { testName: "Pro-BNP", testCode: "PROBNP", testCategory: "Cardiac", price: 2000, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Heart failure marker" },
    { testName: "Homocysteine", testCode: "HOMO", testCategory: "Cardiac", price: 1200, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: true, description: "Heart disease risk marker" },
    { testName: "hs-CRP (High Sensitivity CRP)", testCode: "HSCRP", testCategory: "Cardiac", price: 800, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Inflammation & heart risk marker" },

    // ==================== HORMONAL TESTS ====================
    { testName: "Testosterone (Total)", testCode: "TEST", testCategory: "Hormonal", price: 600, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Male hormone level" },
    { testName: "Free Testosterone", testCode: "FTEST", testCategory: "Hormonal", price: 900, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Free testosterone level" },
    { testName: "Estradiol (E2)", testCode: "E2", testCategory: "Hormonal", price: 600, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Estrogen hormone" },
    { testName: "Progesterone", testCode: "PROG", testCategory: "Hormonal", price: 600, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Female hormone" },
    { testName: "FSH (Follicle Stimulating Hormone)", testCode: "FSH", testCategory: "Hormonal", price: 500, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Reproductive hormone" },
    { testName: "LH (Luteinizing Hormone)", testCode: "LH", testCategory: "Hormonal", price: 500, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Reproductive hormone" },
    { testName: "Prolactin", testCode: "PRL", testCategory: "Hormonal", price: 600, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Pituitary hormone" },
    { testName: "Cortisol (Morning)", testCode: "CORT", testCategory: "Hormonal", price: 600, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: true, description: "Stress hormone" },
    { testName: "DHEA-S", testCode: "DHEA", testCategory: "Hormonal", price: 800, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Adrenal hormone" },
    { testName: "Insulin (Fasting)", testCode: "INS", testCategory: "Hormonal", price: 600, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: true, description: "Insulin level" },
    { testName: "Growth Hormone (GH)", testCode: "GH", testCategory: "Hormonal", price: 1000, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: true, description: "Growth hormone level" },
    { testName: "AMH (Anti-Mullerian Hormone)", testCode: "AMH", testCategory: "Hormonal", price: 2000, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Ovarian reserve test" },
    { testName: "Beta HCG (Pregnancy Test)", testCode: "BHCG", testCategory: "Hormonal", price: 500, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Pregnancy confirmation" },

    // ==================== INFECTIOUS DISEASE TESTS ====================
    { testName: "HIV 1 & 2 Antibody", testCode: "HIV", testCategory: "Infectious Disease", price: 500, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "HIV screening" },
    { testName: "HBsAg (Hepatitis B Surface Antigen)", testCode: "HBSAG", testCategory: "Infectious Disease", price: 400, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Hepatitis B screening" },
    { testName: "Anti-HCV (Hepatitis C Antibody)", testCode: "HCV", testCategory: "Infectious Disease", price: 600, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Hepatitis C screening" },
    { testName: "VDRL (Syphilis)", testCode: "VDRL", testCategory: "Infectious Disease", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Syphilis screening" },
    { testName: "Widal Test (Typhoid)", testCode: "WIDAL", testCategory: "Infectious Disease", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Typhoid fever test" },
    { testName: "Dengue NS1 Antigen", testCode: "DNS1", testCategory: "Infectious Disease", price: 800, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Early dengue detection" },
    { testName: "Dengue IgG/IgM Antibody", testCode: "DENG", testCategory: "Infectious Disease", price: 800, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Dengue antibody test" },
    { testName: "Malaria Parasite (MP)", testCode: "MP", testCategory: "Infectious Disease", price: 200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Malaria detection" },
    { testName: "Malaria Antigen (Rapid)", testCode: "MALAR", testCategory: "Infectious Disease", price: 400, sampleType: "Blood", turnaroundTime: "2 hours", fastingRequired: false, description: "Rapid malaria test" },
    { testName: "Chikungunya IgM", testCode: "CHIK", testCategory: "Infectious Disease", price: 800, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Chikungunya test" },
    { testName: "COVID-19 RT-PCR", testCode: "COVIDP", testCategory: "Infectious Disease", price: 500, sampleType: "Nasal Swab", turnaroundTime: "24 hours", fastingRequired: false, description: "COVID-19 detection" },
    { testName: "COVID-19 Rapid Antigen", testCode: "COVIDR", testCategory: "Infectious Disease", price: 300, sampleType: "Nasal Swab", turnaroundTime: "30 minutes", fastingRequired: false, description: "Rapid COVID test" },
    { testName: "Tuberculosis (TB) - Mantoux Test", testCode: "MANT", testCategory: "Infectious Disease", price: 300, sampleType: "Skin", turnaroundTime: "48-72 hours", fastingRequired: false, description: "TB skin test" },
    { testName: "QuantiFERON TB Gold", testCode: "QTBG", testCategory: "Infectious Disease", price: 3000, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "TB blood test" },

    // ==================== ALLERGY TESTS ====================
    { testName: "Total IgE", testCode: "IGE", testCategory: "Allergy", price: 800, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Overall allergy indicator" },
    { testName: "Food Allergy Panel (Veg)", testCode: "FALV", testCategory: "Allergy", price: 3000, sampleType: "Blood", turnaroundTime: "5-7 days", fastingRequired: false, description: "Vegetarian food allergies" },
    { testName: "Food Allergy Panel (Non-Veg)", testCode: "FALNV", testCategory: "Allergy", price: 3000, sampleType: "Blood", turnaroundTime: "5-7 days", fastingRequired: false, description: "Non-vegetarian food allergies" },
    { testName: "Inhalant Allergy Panel", testCode: "INHA", testCategory: "Allergy", price: 3500, sampleType: "Blood", turnaroundTime: "5-7 days", fastingRequired: false, description: "Dust, pollen, mold allergies" },
    { testName: "Drug Allergy Panel", testCode: "DRUG", testCategory: "Allergy", price: 2500, sampleType: "Blood", turnaroundTime: "5-7 days", fastingRequired: false, description: "Common drug allergies" },

    // ==================== COAGULATION TESTS ====================
    { testName: "Coagulation Profile (PT, INR, aPTT)", testCode: "COAG", testCategory: "Blood Test", price: 800, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Complete clotting profile" },
    { testName: "Prothrombin Time (PT)", testCode: "PT", testCategory: "Blood Test", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Blood clotting time" },
    { testName: "INR", testCode: "INR", testCategory: "Blood Test", price: 300, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "International Normalized Ratio" },
    { testName: "aPTT", testCode: "APTT", testCategory: "Blood Test", price: 400, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Activated Partial Thromboplastin Time" },
    { testName: "D-Dimer", testCode: "DDIM", testCategory: "Blood Test", price: 1200, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Blood clot marker" },
    { testName: "Fibrinogen", testCode: "FIB", testCategory: "Blood Test", price: 600, sampleType: "Blood", turnaroundTime: "24 hours", fastingRequired: false, description: "Clotting protein level" },
    { testName: "Bleeding Time (BT)", testCode: "BT", testCategory: "Blood Test", price: 100, sampleType: "Blood", turnaroundTime: "1 hour", fastingRequired: false, description: "Bleeding time test" },
    { testName: "Clotting Time (CT)", testCode: "CT", testCategory: "Blood Test", price: 100, sampleType: "Blood", turnaroundTime: "1 hour", fastingRequired: false, description: "Clotting time test" },

    // ==================== CANCER MARKERS ====================
    { testName: "PSA (Prostate Specific Antigen)", testCode: "PSA", testCategory: "Cancer Markers", price: 800, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Prostate cancer marker" },
    { testName: "Free PSA", testCode: "FPSA", testCategory: "Cancer Markers", price: 1000, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Free prostate specific antigen" },
    { testName: "CA-125", testCode: "CA125", testCategory: "Cancer Markers", price: 1200, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Ovarian cancer marker" },
    { testName: "CA 19-9", testCode: "CA199", testCategory: "Cancer Markers", price: 1200, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Pancreatic cancer marker" },
    { testName: "CA 15-3", testCode: "CA153", testCategory: "Cancer Markers", price: 1200, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Breast cancer marker" },
    { testName: "CEA (Carcinoembryonic Antigen)", testCode: "CEA", testCategory: "Cancer Markers", price: 1000, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Colon/GI cancer marker" },
    { testName: "AFP (Alpha Fetoprotein)", testCode: "AFP", testCategory: "Cancer Markers", price: 800, sampleType: "Blood", turnaroundTime: "48 hours", fastingRequired: false, description: "Liver cancer marker" },

    // ==================== URINE TESTS ====================
    { testName: "Urine Routine & Microscopy", testCode: "URM", testCategory: "Urine Test", price: 150, sampleType: "Urine", turnaroundTime: "24 hours", fastingRequired: false, description: "Complete urine analysis" },
    { testName: "Urine Culture & Sensitivity", testCode: "UCS", testCategory: "Urine Test", price: 600, sampleType: "Urine", turnaroundTime: "48-72 hours", fastingRequired: false, description: "Urinary infection test" },
    { testName: "24-Hour Urine Protein", testCode: "24UP", testCategory: "Urine Test", price: 400, sampleType: "24hr Urine", turnaroundTime: "48 hours", fastingRequired: false, description: "Kidney protein loss" },
    { testName: "Urine Microalbumin", testCode: "MALB", testCategory: "Urine Test", price: 500, sampleType: "Urine", turnaroundTime: "24 hours", fastingRequired: false, description: "Early kidney damage test" },
    { testName: "Urine Albumin Creatinine Ratio (ACR)", testCode: "ACR", testCategory: "Urine Test", price: 600, sampleType: "Urine", turnaroundTime: "24 hours", fastingRequired: false, description: "Kidney damage marker" },
    { testName: "Urine Pregnancy Test", testCode: "UPT", testCategory: "Urine Test", price: 100, sampleType: "Urine", turnaroundTime: "30 minutes", fastingRequired: false, description: "Pregnancy detection" },

    // ==================== STOOL TESTS ====================
    { testName: "Stool Routine & Microscopy", testCode: "SRM", testCategory: "Stool Test", price: 150, sampleType: "Stool", turnaroundTime: "24 hours", fastingRequired: false, description: "Complete stool analysis" },
    { testName: "Stool Culture & Sensitivity", testCode: "SCS", testCategory: "Stool Test", price: 600, sampleType: "Stool", turnaroundTime: "48-72 hours", fastingRequired: false, description: "Stool infection test" },
    { testName: "Stool Occult Blood", testCode: "SOB", testCategory: "Stool Test", price: 200, sampleType: "Stool", turnaroundTime: "24 hours", fastingRequired: false, description: "Hidden blood in stool" },
    { testName: "Stool for Ova & Parasites", testCode: "SOP", testCategory: "Stool Test", price: 200, sampleType: "Stool", turnaroundTime: "24 hours", fastingRequired: false, description: "Parasitic infection test" },
    { testName: "H. Pylori Stool Antigen", testCode: "HPSA", testCategory: "Stool Test", price: 800, sampleType: "Stool", turnaroundTime: "24 hours", fastingRequired: false, description: "H. pylori infection" },

    // ==================== X-RAY ====================
    { testName: "X-Ray Chest PA View", testCode: "XRCP", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Chest X-ray front view" },
    { testName: "X-Ray Chest AP/Lateral", testCode: "XRCL", testCategory: "Imaging", price: 600, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Chest X-ray with lateral view" },
    { testName: "X-Ray Abdomen", testCode: "XRAB", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Abdominal X-ray" },
    { testName: "X-Ray Spine (Cervical)", testCode: "XRSC", testCategory: "Imaging", price: 600, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Neck spine X-ray" },
    { testName: "X-Ray Spine (Thoracic)", testCode: "XRST", testCategory: "Imaging", price: 600, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Upper back spine X-ray" },
    { testName: "X-Ray Spine (Lumbar)", testCode: "XRSL", testCategory: "Imaging", price: 600, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Lower back spine X-ray" },
    { testName: "X-Ray Spine (Full)", testCode: "XRSF", testCategory: "Imaging", price: 1200, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Complete spine X-ray" },
    { testName: "X-Ray Skull", testCode: "XRSK", testCategory: "Imaging", price: 500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Skull X-ray" },
    { testName: "X-Ray Pelvis", testCode: "XRPV", testCategory: "Imaging", price: 500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Pelvic X-ray" },
    { testName: "X-Ray Hip Joint", testCode: "XRHP", testCategory: "Imaging", price: 500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Hip joint X-ray" },
    { testName: "X-Ray Knee Joint", testCode: "XRKN", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Knee joint X-ray" },
    { testName: "X-Ray Shoulder", testCode: "XRSH", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Shoulder X-ray" },
    { testName: "X-Ray Elbow", testCode: "XREL", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Elbow X-ray" },
    { testName: "X-Ray Wrist", testCode: "XRWR", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Wrist X-ray" },
    { testName: "X-Ray Hand", testCode: "XRHD", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Hand X-ray" },
    { testName: "X-Ray Ankle", testCode: "XRAN", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Ankle X-ray" },
    { testName: "X-Ray Foot", testCode: "XRFT", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Foot X-ray" },
    { testName: "X-Ray PNS (Paranasal Sinuses)", testCode: "XRPNS", testCategory: "Imaging", price: 400, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Sinus X-ray" },
    { testName: "X-Ray Dental OPG", testCode: "XROPG", testCategory: "Imaging", price: 600, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Dental panoramic X-ray" },

    // ==================== ULTRASOUND ====================
    { testName: "USG Abdomen (Complete)", testCode: "USGA", testCategory: "Imaging", price: 1200, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: true, description: "Complete abdominal ultrasound" },
    { testName: "USG Abdomen & Pelvis", testCode: "USGAP", testCategory: "Imaging", price: 1500, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: true, description: "Abdomen and pelvis scan" },
    { testName: "USG Pelvis (Female)", testCode: "USGPF", testCategory: "Imaging", price: 1000, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: true, description: "Female pelvic ultrasound" },
    { testName: "USG Pelvis (Male)", testCode: "USGPM", testCategory: "Imaging", price: 1000, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: true, description: "Male pelvic ultrasound" },
    { testName: "USG KUB (Kidney, Ureter, Bladder)", testCode: "USGKUB", testCategory: "Imaging", price: 1000, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: true, description: "Urinary system ultrasound" },
    { testName: "USG Thyroid", testCode: "USGTH", testCategory: "Imaging", price: 800, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Thyroid ultrasound" },
    { testName: "USG Breast (Both)", testCode: "USGBR", testCategory: "Imaging", price: 1200, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Breast ultrasound" },
    { testName: "USG Neck/Soft Tissue", testCode: "USGNK", testCategory: "Imaging", price: 800, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Neck soft tissue scan" },
    { testName: "USG Scrotum", testCode: "USGSC", testCategory: "Imaging", price: 800, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Scrotal ultrasound" },
    { testName: "USG Obstetric (Pregnancy)", testCode: "USGOB", testCategory: "Imaging", price: 1000, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Pregnancy ultrasound" },
    { testName: "USG NT Scan (11-14 weeks)", testCode: "USGNT", testCategory: "Imaging", price: 2000, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Nuchal translucency scan" },
    { testName: "USG Anomaly Scan (18-22 weeks)", testCode: "USGAN", testCategory: "Imaging", price: 2500, sampleType: "N/A", turnaroundTime: "1-2 hours", fastingRequired: false, description: "Fetal anomaly scan" },
    { testName: "USG Doppler (Pregnancy)", testCode: "USGDP", testCategory: "Imaging", price: 2000, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Pregnancy blood flow scan" },
    { testName: "USG Carotid Doppler", testCode: "USGCD", testCategory: "Imaging", price: 2500, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Neck artery blood flow" },
    { testName: "USG Arterial Doppler (Lower Limb)", testCode: "USGAL", testCategory: "Imaging", price: 2500, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Leg artery blood flow" },
    { testName: "USG Venous Doppler (Lower Limb)", testCode: "USGVL", testCategory: "Imaging", price: 2500, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Leg vein blood flow" },

    // ==================== CT SCAN ====================
    { testName: "CT Scan Brain (Plain)", testCode: "CTB", testCategory: "Imaging", price: 3500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Brain CT without contrast" },
    { testName: "CT Scan Brain (Contrast)", testCode: "CTBC", testCategory: "Imaging", price: 5000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: true, description: "Brain CT with contrast" },
    { testName: "CT Scan Chest (Plain)", testCode: "CTC", testCategory: "Imaging", price: 4000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Chest CT without contrast" },
    { testName: "CT Scan Chest (HRCT)", testCode: "CTHR", testCategory: "Imaging", price: 4500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "High resolution chest CT" },
    { testName: "CT Scan Abdomen (Plain)", testCode: "CTA", testCategory: "Imaging", price: 4000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: true, description: "Abdominal CT without contrast" },
    { testName: "CT Scan Abdomen (Contrast)", testCode: "CTAC", testCategory: "Imaging", price: 6000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: true, description: "Abdominal CT with contrast" },
    { testName: "CT Scan Abdomen & Pelvis", testCode: "CTAP", testCategory: "Imaging", price: 7000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: true, description: "Abdomen and pelvis CT" },
    { testName: "CT Scan Spine (Cervical)", testCode: "CTSC", testCategory: "Imaging", price: 4000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Neck spine CT" },
    { testName: "CT Scan Spine (Lumbar)", testCode: "CTSL", testCategory: "Imaging", price: 4000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Lower back CT" },
    { testName: "CT Scan PNS", testCode: "CTPNS", testCategory: "Imaging", price: 3500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Sinus CT scan" },
    { testName: "CT Angiography (Brain)", testCode: "CTAB", testCategory: "Imaging", price: 8000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: true, description: "Brain blood vessel CT" },
    { testName: "CT Angiography (Coronary)", testCode: "CTCA", testCategory: "Imaging", price: 12000, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: true, description: "Heart blood vessel CT" },
    { testName: "CT KUB (Kidney Stone)", testCode: "CTKUB", testCategory: "Imaging", price: 3500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Kidney stone detection CT" },

    // ==================== MRI ====================
    { testName: "MRI Brain (Plain)", testCode: "MRIB", testCategory: "Imaging", price: 6000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Brain MRI without contrast" },
    { testName: "MRI Brain (Contrast)", testCode: "MRIBC", testCategory: "Imaging", price: 9000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: true, description: "Brain MRI with contrast" },
    { testName: "MRI Spine (Cervical)", testCode: "MRISC", testCategory: "Imaging", price: 6000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Neck spine MRI" },
    { testName: "MRI Spine (Thoracic)", testCode: "MRIST", testCategory: "Imaging", price: 6000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Upper back MRI" },
    { testName: "MRI Spine (Lumbar)", testCode: "MRISL", testCategory: "Imaging", price: 6000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Lower back MRI" },
    { testName: "MRI Spine (Whole)", testCode: "MRISW", testCategory: "Imaging", price: 15000, sampleType: "N/A", turnaroundTime: "3-4 hours", fastingRequired: false, description: "Complete spine MRI" },
    { testName: "MRI Knee", testCode: "MRIKN", testCategory: "Imaging", price: 6000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Knee joint MRI" },
    { testName: "MRI Shoulder", testCode: "MRISH", testCategory: "Imaging", price: 6000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Shoulder MRI" },
    { testName: "MRI Hip", testCode: "MRIHP", testCategory: "Imaging", price: 6000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Hip joint MRI" },
    { testName: "MRI Abdomen", testCode: "MRIAB", testCategory: "Imaging", price: 8000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: true, description: "Abdominal MRI" },
    { testName: "MRI Pelvis", testCode: "MRIPV", testCategory: "Imaging", price: 8000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: true, description: "Pelvic MRI" },
    { testName: "MRI Breast", testCode: "MRIBR", testCategory: "Imaging", price: 10000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Breast MRI" },
    { testName: "MRA (MR Angiography Brain)", testCode: "MRAB", testCategory: "Imaging", price: 10000, sampleType: "N/A", turnaroundTime: "2-3 hours", fastingRequired: false, description: "Brain blood vessel MRI" },

    // ==================== ECG & CARDIAC ====================
    { testName: "ECG (12 Lead)", testCode: "ECG", testCategory: "Cardiac", price: 200, sampleType: "N/A", turnaroundTime: "30 minutes", fastingRequired: false, description: "Electrocardiogram" },
    { testName: "2D Echocardiography", testCode: "ECHO", testCategory: "Cardiac", price: 2000, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Heart ultrasound" },
    { testName: "2D Echo with Color Doppler", testCode: "ECHOD", testCategory: "Cardiac", price: 2500, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Heart ultrasound with blood flow" },
    { testName: "Stress Test (TMT)", testCode: "TMT", testCategory: "Cardiac", price: 1500, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: true, description: "Treadmill test" },
    { testName: "Holter Monitoring (24 hrs)", testCode: "HOLT", testCategory: "Cardiac", price: 2500, sampleType: "N/A", turnaroundTime: "48 hours", fastingRequired: false, description: "24-hour ECG monitoring" },
    { testName: "Ambulatory BP Monitoring (ABPM)", testCode: "ABPM", testCategory: "Cardiac", price: 1500, sampleType: "N/A", turnaroundTime: "48 hours", fastingRequired: false, description: "24-hour BP monitoring" },

    // ==================== OTHER TESTS ====================
    { testName: "Pulmonary Function Test (PFT)", testCode: "PFT", testCategory: "Other", price: 800, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Lung function test" },
    { testName: "EEG (Electroencephalogram)", testCode: "EEG", testCategory: "Other", price: 1500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Brain wave test" },
    { testName: "EMG (Electromyography)", testCode: "EMG", testCategory: "Other", price: 2500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Nerve and muscle test" },
    { testName: "Nerve Conduction Study (NCS)", testCode: "NCS", testCategory: "Other", price: 2500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Nerve function test" },
    { testName: "Audiometry (Hearing Test)", testCode: "AUD", testCategory: "Other", price: 500, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Hearing function test" },
    { testName: "BERA (Brainstem Evoked Response)", testCode: "BERA", testCategory: "Other", price: 1500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Hearing pathway test" },
    { testName: "Bone Density (DEXA Scan)", testCode: "DEXA", testCategory: "Other", price: 2500, sampleType: "N/A", turnaroundTime: "1 hour", fastingRequired: false, description: "Bone strength test" },
    { testName: "Mammography (Both Breasts)", testCode: "MAMM", testCategory: "Imaging", price: 1500, sampleType: "N/A", turnaroundTime: "2 hours", fastingRequired: false, description: "Breast X-ray screening" },
];

const seedTests = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing tests (optional - comment out if you want to keep existing)
        await Test.deleteMany({});
        console.log("🗑️  Cleared existing tests");

        // Insert all tests
        const result = await Test.insertMany(tests);
        console.log(`✅ Successfully added ${result.length} tests to database`);

        // Print summary by category
        const categories = [...new Set(tests.map(t => t.testCategory))];
        console.log("\n📊 Tests by Category:");
        for (const cat of categories) {
            const count = tests.filter(t => t.testCategory === cat).length;
            console.log(`   ${cat}: ${count} tests`);
        }

        await mongoose.disconnect();
        console.log("\n✅ Database seeding completed!");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedTests();
