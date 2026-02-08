import { Router } from "express";
import {
    addPatient_controller,
    getAllPatients_controller,
    getPatientById_controller,
    updatePatient_controller,
    deletePatient_controller,
    searchPatients_controller
} from "../controllers/patient.controller.js";
import { authMiddleware } from "../middleware/auth.midddleware.js";
import { isClient } from "../middleware/roleCheck.middleware.js";

const router = Router();

// Patient CRUD routes (all protected by auth)
router.post("/add", authMiddleware, isClient, addPatient_controller);           // Add new patient
router.get("/all", authMiddleware, isClient, getAllPatients_controller);        // Get all patients
router.get("/search", authMiddleware, isClient, searchPatients_controller);     // Search patients
router.get("/:id", authMiddleware, isClient, getPatientById_controller);        // Get patient by ID
router.put("/:id", authMiddleware, isClient, updatePatient_controller);         // Update patient
router.delete("/:id", authMiddleware, isClient, deletePatient_controller);      // Delete patient

export default router;
