import {
    getBillsByClientId_DAO,
    getBillbyClinetIdandPaymentStatus_DAO,
    getPaymentSummary_DAO,
    findBillById_DAO
} from "../DAO/bill.dao.js";
import Bill from "../models/bill.model.js";

// making two saperate functions 1 for getting bil by clinet id and saperate function for getting bill bystatus

export const getBillByPaymentStatus_Service = async (clientId, status) => {
    try {
        return await getBillbyClinetIdandPaymentStatus_DAO(clientId, status)

    } catch (error) {
        throw new Error(`SERVICE ERROR | from getBillbyClinetIdandPaymentStatus_DAO ${clientId} | ${status} |error message => ${error.message}`)
    }
}


export const getAllBillsByClientId_Service = async (clientId) => {
    try {
        return await getBillsByClientId_DAO(clientId)
    } catch (error) {
        throw new Error(`SERVICE ERROR | getAllBillsByClientId_Service ${clientId} | Error Message => ${error} `)
    }
}

// Get payment summary
export const getPaymentSummary_Service = async (clientId) => {
    console.log("Getting payment summary for clientId SERVICE :", clientId); // remove it later 
    try {
        const summary = await getPaymentSummary_DAO(clientId);

        // Format the summary
        const formattedSummary = {
            pending: { count: 0, totalAmount: 0 },
            paid: { count: 0, totalAmount: 0 },
            'partially paid': { count: 0, totalAmount: 0 }
        };

        summary.forEach(item => {
            formattedSummary[item._id] = {
                count: item.count,
                totalAmount: item.totalAmount
            };
        });
        return formattedSummary;

    } catch (error) {
        throw new Error(`SERVICE ERROR | getPaymentSummary_Service ${clientId} | Error Message => ${error} `)
    }


};

export const generateAndSaveBill_service = async (billData) => {
    try {
        const isBillExist = await findBillById_DAO(billData._id);
        if (isBillExist) {
            // update existing bill logic here
            Object.assign(isBillExist, billData);
            return await isBillExist.save();  // ⚠️⚠️this line need to be check it can create problem like it can save same bill again and again and createa never ending loop situation
        } else {
            // create new bill logic here
            const newBill = new Bill(billData);
            return await newBill.save();
        }

    } catch (error) {
        throw new Error(`SERVICE ERROR | generateAndSaveBill_service  | Error Message => ${error.message} `)
    }
}