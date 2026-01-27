import { Router } from "express";
import { registerUser_Controller, getAllClients_Controller } from "../controllers/admin.controller.js";

const router = Router()

router.post("/register", registerUser_Controller)
router.get("/getAllClients", getAllClients_Controller)

export default router