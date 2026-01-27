import ClientModel from "../models/client.model.js"

export const registerClientandSaveDAO = async (shopName, shopAddress, ownerPhoneNumeber, ownerName, ownerEmailID, ownerGSTnumber) => {
    const newClient = await new ClientModel(
        {
            shopName,
            shopAddress,
            ownerPhoneNumeber,
            ownerName,
            ownerEmailID,
            ownerGSTnumber,
        }
    )
    return await newClient.save()
}

export const getClientByShopNameDAO = async (shopName) => {
    return ClientModel.findOne({ shopName })
}

export const getAllClientsDAO = async () => {
    return await ClientModel.find()
}