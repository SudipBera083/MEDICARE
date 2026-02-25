import { Router } from "express";
import {
  bookAppointment_controller,
  seePaymentStatus_controller,
  generateAndSaveBill_controller,
  updateReportValues_controller,
  generateReports_controller,
  generatePdfOfBill_controller,
  saveClientSubscription_controller,
  getClientSubscriptionByEmail_controller,
  updateClientSubscription_controller,
  deleteClientSubscription_controller,
  isClientSubscriptionActive_controller,
  getAllClientSubscriptions_controller
} from "../controllers/client.controller.js";

import { clientLogin_controller, clientLogout_controller } from "../controllers/login-out.controller.js";
import { authMiddleware } from "../middleware/auth.midddleware.js";
import { isClient } from "../middleware/roleCheck.middleware.js";
import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";

const router = Router();

router.get("/paymentStatus", authMiddleware, isClient, seePaymentStatus_controller);
router.post("/login", clientLogin_controller);
router.post("/logout", clientLogout_controller);
router.post("/bookAppointment", authMiddleware, isClient, bookAppointment_controller);
router.post("/updateReportValues", authMiddleware, isClient, updateReportValues_controller);
router.post("/generateBill", authMiddleware, isClient, generateAndSaveBill_controller);
router.get("/downloadBillPdf/:billId/pdf", authMiddleware, isClient, generatePdfOfBill_controller);
router.post("/generateReports", authMiddleware, isClient, generateReports_controller);

// Subscription routes
router.post("/subscription", authMiddleware, isClient, tryCatchWrapper(saveClientSubscription_controller));
router.get("/subscription", authMiddleware, isClient, tryCatchWrapper(getClientSubscriptionByEmail_controller));
router.put("/subscription", authMiddleware, isClient, tryCatchWrapper(updateClientSubscription_controller));
router.delete("/subscription", authMiddleware, isClient, tryCatchWrapper(deleteClientSubscription_controller));
router.get("/subscription/active", authMiddleware, isClient, tryCatchWrapper(isClientSubscriptionActive_controller));
router.get("/subscriptions", authMiddleware, isClient, tryCatchWrapper(getAllClientSubscriptions_controller));

export default router;