import ClientModel from "../models/client.model.js"
import bcrypt from "bcrypt"


// registering the client in the database 
export const registerClientandSave_DAO = async (shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID, ownerGSTnumber) => {
    const newClient = await new ClientModel(
        {
            shopName,
            shopAddress,
            ownerPhoneNumber,
            ownerName,
            ownerEmailID,
            ownerGSTnumber,
        }
    )
    return await newClient.save()
}
// finding client by shop name
export const getClientByShopName_DAO = async (shopName) => {
    return ClientModel.findOne({ shopName })
}


// Find client by email
export const findClientByEmail_DAO = async (email) => {
    return await ClientModel.findOne({ email });
};


// Compare client password
export const compareClientPassword_DAO = async (password, client) => {
    return await bcrypt.compare(password, client.password);
};
