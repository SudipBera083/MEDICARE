import {
    getBillsByClientId_DAO,
    getBillbyClinetIdandPaymentStatus_DAO,
    getPaymentSummary_DAO,
    findBillById_DAO
} from "../DAO/bill.dao.js";
import { getAppointmentById_DAO, updateAppointmentBillId_DAO } from "../DAO/testAppointment.dao.js";
import Bill from "../models/bill.model.js";

// making two saperate functions 1 for getting bil by clinet id and saperate function for getting bill bystatus

export const getBillByPaymentStatus_Service = async (clientId, status) => {
    try {
        return await getBillbyClinetIdandPaymentStatus_DAO(clientId, status)

    } catch (error) {
        console.error(`SERVICE ERROR | from getBillbyClinetIdandPaymentStatus_DAO ${clientId} | ${status} |error message => ${error.message}`)
        throw error;
    }
}


export const getAllBillsByClientId_Service = async (clientId) => {
    try {
        return await getBillsByClientId_DAO(clientId)
    } catch (error) {
        console.error(`SERVICE ERROR | getAllBillsByClientId_Service ${clientId} | Error Message => ${error} `)
        throw error;
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
        console.log(`SERVICE ERROR | getPaymentSummary_Service ${clientId} | Error Message => ${error} `)
        throw error;
    }


};

export const getBillById_Service = async (billId) => {
    try {
        const bill = await findBillById_DAO(billId);
        if (!bill) {
            throw new Error(`Bill not found with ID: ${billId}`);
        }
        return bill;
    } catch (error) {
        console.error(`SERVICE ERROR | getBillById_Service ${billId} | Error Message => ${error.message}`);
        throw error;
    }
};

// Generate consolidated bill from multiple appointments
export const generateConsolidatedBill_service = async (appointmentIds, clientId) => {
    try {
        if (!appointmentIds || appointmentIds.length === 0) {
            throw new Error('At least one appointmentId is required');
        }

        // 1. Fetch all appointments
        const appointments = [];
        for (const id of appointmentIds) {
            const appt = await getAppointmentById_DAO(id);
            appointments.push(appt);
        }

        // 2. Categorize appointments
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const alreadyBilled = [];
        const billable = [];
        const oldUnbilled = [];

        for (const appt of appointments) {
            if (appt.billID) {
                alreadyBilled.push({
                    id: appt._id,
                    testName: appt.testID?.testName || 'Unknown',
                    reason: 'Already billed'
                });
            } else if (new Date(appt.createdAt) >= twentyFourHoursAgo) {
                billable.push(appt);
            } else {
                oldUnbilled.push({
                    id: appt._id,
                    testName: appt.testID?.testName || 'Unknown',
                    bookedAt: appt.createdAt
                });
            }
        }

        // 3. If nothing to bill, return early
        if (billable.length === 0) {
            return {
                bill: null,
                billedAppointments: [],
                skippedAlreadyBilled: alreadyBilled,
                reminder: oldUnbilled.length > 0 ? {
                    message: 'These appointments are older than 24 hours and were not billed',
                    appointments: oldUnbilled
                } : null
            };
        }

        // 4. Verify all billable appointments belong to same patient
        const firstPatientId = billable[0].PatientID._id.toString();
        for (const appt of billable) {
            if (appt.PatientID._id.toString() !== firstPatientId) {
                throw new Error('All appointments must belong to the same patient');
            }
        }

        const patient = billable[0].PatientID;

        // 5. Build bill items from all billable appointments
        const items = [];
        let subtotal = 0;

        for (const appt of billable) {
            const test = appt.testID;
            if (!test || !test.price) {
                throw new Error(`Test or price missing for appointment: ${appt._id}`);
            }
            items.push({
                testName: test.testName,
                testCode: test.testCode || '',
                price: test.price,
                quantity: 1,
                subtotal: test.price
            });
            subtotal += test.price;
        }

        // 6. Build bill data
        const billData = {
            clientId: clientId,
            patientId: patient._id,
            patientName: `${patient.firstName || ''} ${patient.middleName || ''} ${patient.lastName || ''}`.trim(),
            patientAge: patient.age || null,
            patientGender: patient.gender || null,
            patientPhone: patient.patientPhoneNumber || '',
            items: items,
            subtotal: subtotal,
            discount: 0,
            billAmount: subtotal,
            billStatus: 'pending',
            paidAmount: 0,
            pendingAmount: subtotal,
            paymentMethod: 'cash',
            billDate: new Date(),
            notes: ''
        };

        // 7. Save the bill
        const newBill = new Bill(billData);
        const savedBill = await newBill.save();

        // 8. Update all billable appointments with billID
        const billedAppointmentIds = [];
        for (const appt of billable) {
            await updateAppointmentBillId_DAO(appt._id, savedBill._id);
            billedAppointmentIds.push(appt._id);
        }

        return {
            bill: savedBill,
            billedAppointments: billedAppointmentIds,
            skippedAlreadyBilled: alreadyBilled,
            reminder: oldUnbilled.length > 0 ? {
                message: 'These appointments are older than 24 hours and were not billed',
                appointments: oldUnbilled
            } : null
        };

    } catch (error) {
        console.error(`SERVICE ERROR | generateConsolidatedBill_service | Error Message => ${error.message}`);
        throw error;
    }
};
