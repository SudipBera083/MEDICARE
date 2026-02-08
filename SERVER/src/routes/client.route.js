// book appointment, see paymentstatus , generate bill , update report values , generate reports 
import { Router } from "express";
import { bookAppointment_controller, seePaymentStatus_controller, generateAndSaveBill_controller, updateReportValues_controller, generateReports_controller , generatePdfOfBill_controller } from "../controllers/client.controller.js";
import { clientLogin_controller } from "../controllers/login-out.controller.js";
import { authMiddleware} from "../middleware/auth.midddleware.js"
import { isClient} from "../middleware/roleCheck.middleware.js"

const router = Router();

router.get("/paymentStatus" , authMiddleware, isClient, seePaymentStatus_controller)//✅
router.post("/login", clientLogin_controller)  //✅
// router.post("/login" , authMiddleware clientLogin_controller)  //✅
router.post("/bookAppointment" , authMiddleware, isClient, bookAppointment_controller)
router.post("/updateReportValues" , authMiddleware, isClient, updateReportValues_controller)
router.post("/generateBill" , authMiddleware, isClient, generateAndSaveBill_controller)
router.get("downloadBillPdf/:billId/pdf" , authMiddleware, isClient, generatePdfOfBill_controller)  // update the route the route is not proper 
router.post("/generateReports" , authMiddleware, isClient, generateReports_controller)

export default router