import { Router } from "express";
import { 
    registerClient_Controller, 
    getAllClients_Controller, 
    registerAdmin_Controller ,
    findAdminByEmail_Controller
} from "../controllers/admin.controller.js";


import { adminLogin_controller , adminLogout_controller } from "../controllers/login-out.controller.js";

const router = Router()

router.post("/registerClient", registerClient_Controller)
router.post("/registerAdmin", registerAdmin_Controller)
router.post("/login", adminLogin_controller ) 
router.post("/logout", adminLogout_controller ) 
router.get("/getAllClients", getAllClients_Controller)
router.get("/findAdminByEmail/:email", findAdminByEmail_Controller)


export default router