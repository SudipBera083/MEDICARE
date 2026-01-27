import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { registerClientandSaveDAO, getClientByShopNameDAO, getAllClientsDAO } from "../DAO/client.dao.js"


export const registerClient_Service = tryCatchWrapper(async (shopName, shopAddress, ownerPhoneNumeber, ownerName, ownerEmailID, ownerGSTnumber) => {

    if (await getClientByShopNameDAO(shopName)) {
        throw new Error("Client already exists")
    }
    const newClient = await registerClientandSaveDAO(shopName, shopAddress, ownerPhoneNumeber, ownerName, ownerEmailID, ownerGSTnumber)

    return newClient
})

export const getAllClients_Service = tryCatchWrapper(async () => {
    return await getAllClientsDAO()
})