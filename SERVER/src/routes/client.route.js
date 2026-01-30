// book appointment, see paymentstatus , generate bill , update report values , generate reports 
import { Router } from "express";
import { bookAppointment_controller, seePaymentStatus_controller, generateBill_controller, updateReportValues_controller, generateReports_controller } from "../controllers/client.controller.js";
import { clientLogin_controller } from "../controllers/login-out.controller.js";
import { authMiddleware, isClient } from "../middleware/auth.midddleware.js";

const router = Router();

router.post("/login" , authMiddleware, isClient, clientLogin_controller)  //✅
router.get("/paymentStatus" , authMiddleware, isClient, seePaymentStatus_controller)//✅
router.post("/bookAppointment" , authMiddleware, isClient, bookAppointment_controller)
router.post("/updateReportValues" , authMiddleware, isClient, updateReportValues_controller)
router.post("/generateBill" , authMiddleware, isClient, generateBill_controller)
router.post("/generateReports" , authMiddleware, isClient, generateReports_controller)

export default router