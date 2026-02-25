import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { registerClientandSave_DAO, getClientByShopName_DAO } from "../DAO/client.dao.js"
import { getAllClients_DAO } from "../DAO/admin.dao.js";
import { bookNewTestAppointment_DAO } from "../DAO/testAppointment.dao.js"
import { 
    saveClientSubscription_DAO, 
    getClientSubscriptionByEmail_DAO, 
    updateClientSubscription_DAO, 
    deleteClientSubscription_DAO, 
    isClientSubscriptionActive_DAO, 
    getAllClientSubscriptions_DAO }
    from "../DAO/client.dao.js"



export const registerClient_Service = async (shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID,password, ownerGSTnumber) => {

    if (await getClientByShopName_DAO(shopName)) {
        throw new Error("Client already exists")
    }
    const newClient = await registerClientandSave_DAO(shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID, password,ownerGSTnumber)

    return newClient
}

export const getAllClients_Service = tryCatchWrapper(async () => {
    return await getAllClients_DAO()
})


// booking new test appointment service
export const bookNewTestAppointment_Service = async (patientID, tests, testDate, testStatus, paymentID, billID) => {
    try {
        const newTestAppointment = await bookNewTestAppointment_DAO(patientID, tests, testDate, testStatus, paymentID, billID)
        return newTestAppointment
    } catch (error) {
        throw new Error(`SERVICE LAYER ERROR | bookNewTestAppointment_Service | ${error.message}`)
    }
}

// --------------------------- Subscription  -------------------------------------

// saving the client subscription details in the database
export const saveClientSubscription_Service = async (ownerEmailID, subscriptionType, subscriptionStartDate, subscriptionEndDate) => {
    try {
        return await saveClientSubscription_DAO(ownerEmailID, subscriptionType, subscriptionStartDate, subscriptionEndDate) 
    } catch (error) {
        throw new Error(`SERVICE LAYER ERROR | saveClientSubscription_Service | ${error.message}`)
    }
}
    

// finding the client subscription details by email
export const getClientSubscriptionByEmail_Service = async (ownerEmailID) => {
    try {
        return await getClientSubscriptionByEmail_DAO(ownerEmailID)
    } catch (error) {
        throw new Error(`SERVICE LAYER ERROR | getClientSubscriptionByEmail_Service | ${error.message}`)
    }
}

// updating the client subscription details in the database
export const updateClientSubscription_Service = async (data) => {
    return await updateClientSubscription_DAO(
        { ownerEmailID: data.ownerEmailID },
        data
    );
};

// deleting the client subscription details from the database
export const deleteClientSubscription_Service = async (ownerEmailID) => {
    try {        return await deleteClientSubscription_DAO(ownerEmailID)
    } catch (error) {
        throw new Error(`SERVICE LAYER ERROR | deleteClientSubscription_Service | ${error.message}`)
    }
}

// checking if the client subscription is active or not
export const isClientSubscriptionActive_Service = async (ownerEmailID) => {
    try {
        return await isClientSubscriptionActive_DAO(ownerEmailID)
    } catch (error) {
        throw new Error(`SERVICE LAYER ERROR | isClientSubscriptionActive_Service | ${error.message}`)
    }
}


// getting all the client subscription details from the database
export const getAllClientSubscriptions_Service = async () => {
    try {     return await getAllClientSubscriptions_DAO()
    } catch (error) {
        throw new Error(`SERVICE LAYER ERROR | getAllClientSubscriptions_Service | ${error.message}`)
    }
}
