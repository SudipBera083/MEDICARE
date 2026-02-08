import ClientModel from "../models/client.model.js"
import bcrypt from "bcrypt"


// registering the client in the database 
export const registerClientandSave_DAO = async (shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID,password, ownerGSTnumber) => {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hashing the password before storing it in the database.
    const newClient = await new ClientModel(
        {
            shopName,
            shopAddress,
            ownerPhoneNumber,
            ownerName,
            ownerEmailID,
            password: hashedPassword,
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
export const findClientByEmail_DAO = async (ownerEmailID) => {
    return await ClientModel.findOne({ ownerEmailID });
};


// Compare client password
export const compareClientPassword_DAO = async (password, client) => {
    return await bcrypt.compare(password, client.password);
};
