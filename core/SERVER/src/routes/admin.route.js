import { Router } from "express";
import { registerClient_Controller, getAllClients_Controller } from "../controllers/admin.controller.js";
import { adminLogin_controller } from "../controllers/login-out.controller.js";

const router = Router()

router.post("/registerClient", registerClient_Controller)
router.post("/login", adminLogin_controller ) 
router.get("/getAllClients", getAllClients_Controller)

export default router