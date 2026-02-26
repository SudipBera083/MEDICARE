import express from "express";
import {
  createMasterTest,
  getAllMasterTests
} from "../controllers/masterTest.controller.js";

const router = express.Router();

router.post("/", createMasterTest);
router.get("/", getAllMasterTests);

export default router;