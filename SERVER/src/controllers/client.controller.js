import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { billToPdf_service } from "../services/pdfkit.billToPdf.service.js";

import {
    getAllBillsByClientId_Service,
    getPaymentSummary_Service,
    getBillByPaymentStatus_Service,
    generateAndSaveBill_service
} from "../services/bill.service.js";
import { bookNewTestAppointment_Service } from "../services/client.service.js"
import { 
        saveClientSubscription_Service, 
        getClientSubscriptionByEmail_Service,
        updateClientSubscription_Service,
        deleteClientSubscription_Service,
        isClientSubscriptionActive_Service,
        getAllClientSubscriptions_Service
    } 
    from "../services/client.service.js"


// See payment status - Get all bills for the logged-in client
export const seePaymentStatus_controller = async (req, res) => {
    try {
        const clientId = req.user.user_id;  // From JWT token
        const { status } = req.query;  // Optional filter: ?status=pending
        console.log("payment Status in controller: ", status);
        // Get bills by the payemnt status
        const billsByStatus = await getBillByPaymentStatus_Service(clientId, status);
        const allBillsForClient = await getAllBillsByClientId_Service(clientId)
        // Get summary
        const summary = await getPaymentSummary_Service(clientId);

        return res.status(200).json({
            message: "Payment status retrieved successfully ✌️",
            summary,
            allBillsForClient,
            billsByStatus,
            totalBillsByStatus: billsByStatus.length,
            totalBills: allBillsForClient.length
        });
    }
    catch (error) {
        console.error(`CONTROLLER ERROR | seePaymentStatus_controller: ${error}`);
        return res.status(500).json({
            message: error.message,
            controller: "seePaymentStatus_controller",
            error: error.toString()
        });
    };
}



// Other controller functions...
export const bookAppointment_controller = async (req, res) => {
    try {
        const { patientID, tests, testDate, testStatus, paymentID, billID } = req.body;   // next change --> rather than destructuring the total object just pass it as a veriable 

        const newAppointmentBooking = await bookNewTestAppointment_Service(
            patientID,
            tests,
            testDate,
            testStatus,
            paymentID,
            billID
        );

        return res.status(200).json({
            message: "New Appointment is booked successfully ✌️",
            appointmentDetails: newAppointmentBooking
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | bookAppointment_controller: ${error}`);
        return res.status(500).json({
            message: error.message,
            controller: "bookAppointment_controller",
            error: error.toString()
        });
    }
};




export const generateAndSaveBill_controller = async (req, res) => {
    try {
        const clientId = req.user.user_id; // extracting clinetId from JWT  
        const billData = req.body; // bill data to be saved
        billData.clientId = clientId; //  Inject clientId into billData
        const generatedBill = await generateAndSaveBill_service(billData);

        return res.status(201).json({
            message: "Bill generated and saved successfully ✌️",
            bill: generatedBill
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | generateAndSaveBill_controller: ${error}`)
        return res.status(500).json({
            message: error.message,
            controller: "generateAndSaveBill_controller",
            error: error.toString()
        });
    }
};


export const generatePdfOfBill_controller = async (req, res) => {
    try {

        const billData = req.body; // total bill object from the database 

        const pdfBuffer = await billToPdf_service(billData);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=bill-${billData.billNumber}.pdf`);

        res.send(pdfBuffer);

    } catch (error) {
        console.error(`CONTROLLER ERROR | generatePdfOfBill_controller: ${error}`);
        return res.status(500).json({
            message: error.message,
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


// --------------------------- Subscription  -------------------------------------

// saving the client subscription details in the database   
export const saveClientSubscription_controller = async (req, res) => {
    try {
        const { ownerEmailID, subscriptionType, subscriptionStartDate, subscriptionEndDate } = req.body;
        const newSubscription = await saveClientSubscription_Service(ownerEmailID, subscriptionType, subscriptionStartDate, subscriptionEndDate)
        return res.status(201).json({
            message: "Client subscription details saved successfully ✌️",
            subscriptionDetails: newSubscription
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | saveClientSubscription_controller: ${error}`);
        return res.status(500).json({   
            message: error.message,
            controller: "saveClientSubscription_controller",
            error: error.toString()
        });
    }   
}

// finding the client subscription details by email
export const getClientSubscriptionByEmail_controller = async (req, res) => {
  try {
    const ownerEmailID = req.query.ownerEmailID;

    if (!ownerEmailID) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await getClientSubscriptionByEmail_Service(ownerEmailID);

    if (!result) {
      return res.status(404).json({
        message: "Client subscription details not found for the provided email ID"
      });
    }

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// updating the client subscription details in the database
export const updateClientSubscription_controller = async (req, res) => {
    try {
        const result = await updateClientSubscription_Service(req.body);

        return res.status(200).json({
            message: "Subscription updated successfully",
            data: result
        });

    } catch (error) {
        console.error("CONTROLLER ERROR | updateClientSubscription_controller:", error);

        return res.status(500).json({
            message: error.message,
            controller: "updateClientSubscription_controller",
            error: error.toString()
        });
    }
};

// deleting the client subscription details from the database
export const deleteClientSubscription_controller = async (req, res) => {
    try {
        const ownerEmailID = req.query.ownerEmailID; // temporary fix

        const result = await deleteClientSubscription_Service(ownerEmailID);

        if (!result || result.deletedCount === 0) {
            return res.status(404).json({
                message: "Subscription not found"
            });
        }

        return res.status(200).json({
            message: "Subscription deleted successfully"
        });

    } catch (error) {
        console.error("CONTROLLER ERROR | deleteClientSubscription_controller:", error);
        return res.status(500).json({ message:  error.message });
    }
};

// checking if the client subscription is active or not
export const isClientSubscriptionActive_controller = async (req, res) => {
    try {
        const ownerEmailID = req.query.ownerEmailID;  // NOT body

        const isActive = await isClientSubscriptionActive_Service(ownerEmailID);

        return res.status(200).json({
            message: "Client subscription status retrieved successfully ✌️",
            isActive
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// getting all the client subscription details from the database
export const getAllClientSubscriptions_controller = async (req, res) => {
    try {
        const allSubscriptions = await getAllClientSubscriptions_Service();
        return res.status(200).json({
            message: "All client subscription details retrieved successfully ✌️",
            totalSubscriptions: allSubscriptions.length,
            subscriptions: allSubscriptions
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getAllClientSubscriptions_controller: ${error}`);
        return res.status(500).json({
            message: error.message,
            controller: "getAllClientSubscriptions_controller",
            error: error.toString()
        });
    }
}

