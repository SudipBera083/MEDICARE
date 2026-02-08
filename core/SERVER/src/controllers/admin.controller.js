import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { registerClient_Service, getAllClients_Service } from "../services/client.service.js";


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