import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { billToPdf_service } from "../services/pdfkit.billToPdf.service.js";

import {
    getAllBillsByClientId_Service,
    getPaymentSummary_Service,
    getBillByPaymentStatus_Service,
    generateConsolidatedBill_service,
    getBillById_Service
} from "../services/bill.service.js";
import { bookNewTestAppointment_Service } from "../services/client.service.js"

// See payment status - Get all bills for the logged-in client
export const seePaymentStatus_controller = async (req, res) => {
    try {
        const clientId = req.user.user_id;  // From JWT token
        const { status } = req.query;  // Optional filter: ?status=pending
        console.log("payment Status in controller: ", status);
        // Get bills by the payemnt status
        const bills = await getBillByPaymentStatus_Service(clientId, status);
        const allBills = await getAllBillsByClientId_Service(clientId)
        // Get summary
        const summary = await getPaymentSummary_Service(clientId);

        return res.status(200).json({
            message: "Payment status retrieved successfully ✌️",
            summary,
            allBills, // ⚠️use the all bills in saperate case too where user in one click can get all of his bills 
            bills,
            totalBills: bills.length
        });
    }
    catch (error) {
        console.error(`CONTROLLER ERROR | seePaymentStatus_controller  ${error}`);
        return res.status(500).json({
            message: error.message || "Failed to get payment status",
            controller: "seePaymentStatus_controller",
            error: error.toString()
        });
    };
}



// Other controller functions...
export const bookAppointment_controller = async (req, res) => {

    try {
        const { PatientID, testID, testDate, testStatus, paymentID, billID } = req.body
        const newAppointmentBooking = await bookNewTestAppointment_Service(PatientID, testID, testDate, testStatus, paymentID, billID)

        return res.status(200).json({
            message: "New Appointment is booked successfully ✌️"
            , "Appointment Details": newAppointmentBooking
        })
    } catch (error) {
        // throw new Error(`CONTROLLER ERROR | bookAppointment_controller  ${error}`)
        console.error(`CONTROLLER ERROR | bookAppointment_controller  ${error}`);
        return res.status(500).json({
            message: error.message || "Failed to book appointment",
            controller: "bookAppointment_controller",
            error: error.toString()
        });
    }

};




export const generateAndSaveBill_controller = async (req, res) => {
    try {
        const clientId = req.user.user_id; // extracting clientId from JWT  
        const { appointmentIds } = req.body;  // expect array of appointmentIds

        if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0) {
            return res.status(400).json({
                message: "appointmentIds array is required"
            });
        }

        const result = await generateConsolidatedBill_service(appointmentIds, clientId);

        // If no bill was generated
        if (!result.bill) {
            return res.status(200).json({
                message: "No billable appointments found",
                billedAppointments: [],
                skippedAlreadyBilled: result.skippedAlreadyBilled,
                reminder: result.reminder
            });
        }

        return res.status(201).json({
            message: "Bill generated successfully ✌️",
            bill: result.bill,
            billedAppointments: result.billedAppointments,
            skippedAlreadyBilled: result.skippedAlreadyBilled,
            reminder: result.reminder
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | generateAndSaveBill_controller  ${error}`);
        return res.status(500).json({
            message: error.message || "Failed to generate bill",
            controller: "generateAndSaveBill_controller",
            error: error.toString()
        });
    }
};


export const generatePdfOfBill_controller = async (req, res) => {
    try {
        const { billId } = req.params;

        // Fetch bill data from database using the billId
        const billData = await getBillById_Service(billId);

        const pdfBuffer = await billToPdf_service(billData);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=bill-${billData.billNumber}.pdf`);

        res.send(pdfBuffer);

    } catch (error) {
        console.error(`CONTROLLER ERROR | generatePdfOfBill_controller  ${error}`);
        return res.status(500).json({
            message: "Failed to generate PDF",
            controller: "generatePdfOfBill_controller",
            error: error.toString()
        });
    }
};

export const updateReportValues_controller = tryCatchWrapper(async (req, res) => {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented yet" });
});

export const generateReports_controller = tryCatchWrapper(async (req, res) => {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented yet" });
});