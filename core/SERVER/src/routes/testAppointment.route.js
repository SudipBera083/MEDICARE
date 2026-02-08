import { Router } from "express";
import {
    bookTestAppointment_controller,
    getAllTestAppointments_controller,
    getTestAppointmentById_controller,
    getAppointmentsByPatient_controller,
    updateTestAppointment_controller,
    deleteTestAppointment_controller
} from "../controllers/testAppointment.controller.js";
import { authMiddleware } from "../middleware/auth.midddleware.js";
import { isClient } from "../middleware/roleCheck.middleware.js";

const router = Router();

// Test Appointment CRUD routes (all protected by auth)
router.post("/book", authMiddleware, isClient, bookTestAppointment_controller);                    // Book new test appointment
router.get("/all", authMiddleware, isClient, getAllTestAppointments_controller);                   // Get all appointments
router.get("/patient/:patientId", authMiddleware, isClient, getAppointmentsByPatient_controller);  // Get appointments by patient
router.get("/:id", authMiddleware, isClient, getTestAppointmentById_controller);                   // Get appointment by ID
router.put("/:id", authMiddleware, isClient, updateTestAppointment_controller);                    // Update appointment
router.delete("/:id", authMiddleware, isClient, deleteTestAppointment_controller);                 // Delete appointment

export default router;
