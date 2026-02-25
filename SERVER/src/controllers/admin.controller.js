import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { registerClient_Service, getAllClients_Service,} from "../services/client.service.js";

import { createAdmin_Service , findAdminByEmail_Service} from "../services/admin.service.js";
import { cond } from "three/tsl";

// Admin Registration Controller
export const registerAdmin_Controller = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // console.log(req.body); 
    // console.log("Received data in registerAdmin_Controller:", { userName, email, role , password});

    const result = await createAdmin_Service({
      userName,
      email,
      password,
      role
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      controller: "registerAdmin_Controller",
      error: error.message
    });
  }
};

//find admin by email controller
export const findAdminByEmail_Controller = async (req, res) => {
  try {
    const { email } = req.params;
    const admin = await findAdminByEmail_Service(email);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({
        message: "Internal Server Error",
        controller: "findAdminByEmail_Controller",
        error: error.message
    });
  }
};


export const registerClient_Controller = async (req, res) => {
    try{
    const { shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID,password, ownerGSTnumber } = req.body
    const newClient =await registerClient_Service(shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID,password, ownerGSTnumber)
    return res.status(201).json({ message: "Client registered successfully", newClient })
    }
    catch(error){
        console.error(`CONTROLLER ERROR | client | registerClient_Controller ${error}`)
        res.status(500).json({
          message: "Internal Server Error",
          controller: "registerClient_Controller",
          error: error.toString()
        })
    }
}


export const getAllClients_Controller = async (req, res) => {
    try{
    const clients = getAllClients_Service()
    return res.status(200).json({ message: "Clients fetched successfully", clients })
    }
    catch(error){
        console.error(`CONTROLLER ERROR | client | getAllClients_Controller ${error}`)
        res.status(500).json({
          message: "Internal Server Error",
          controller: "getAllClients_Controller",
          error: error.toString()
        })
    }
}