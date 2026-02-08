import { Router } from "express";
import {
    addTest_controller,
    getAllTests_controller,
    getTestById_controller,
    getTestsByCategory_controller,
    searchTests_controller,
    updateTest_controller,
    deleteTest_controller,
    hardDeleteTest_controller
} from "../controllers/test.controller.js";
import { authMiddleware } from "../middleware/auth.midddleware.js";
import { isClient } from "../middleware/roleCheck.middleware.js";

const router = Router();

// Test Catalog CRUD routes (all protected by auth)
router.post("/add", authMiddleware, isClient, addTest_controller);                      // Add new test
router.get("/all", authMiddleware, isClient, getAllTests_controller);                   // Get all tests
router.get("/search", authMiddleware, isClient, searchTests_controller);                // Search tests
router.get("/category/:category", authMiddleware, isClient, getTestsByCategory_controller);  // Get by category
router.get("/:id", authMiddleware, isClient, getTestById_controller);                   // Get test by ID
router.put("/:id", authMiddleware, isClient, updateTest_controller);                    // Update test
router.delete("/:id", authMiddleware, isClient, deleteTest_controller);                 // Soft delete test
router.delete("/hard/:id", authMiddleware, isClient, hardDeleteTest_controller);        // Permanent delete

export default router;
