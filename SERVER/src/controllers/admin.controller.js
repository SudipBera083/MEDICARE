import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { registerClient_Service, getAllClients_Service } from "../services/client.service.js";


export const registerUser_Controller = tryCatchWrapper(async (req, res) => {
    const { shopName, shopAddress, ownerPhoneNumeber, ownerName, ownerEmailID, ownerGSTnumber } = req.body
    const newClient = await registerClient_Service(shopName, shopAddress, ownerPhoneNumeber, ownerName, ownerEmailID, ownerGSTnumber)
    return res.status(201).json({ message: "Client registered successfully", newClient })
})


export const getAllClients_Controller = tryCatchWrapper(async (req, res) => {
    const clients = getAllClients_Service()
    return res.status(200).json({ message: "Clients fetched successfully", clients })
})