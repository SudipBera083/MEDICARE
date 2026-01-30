import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { 
     getAllBillsByClientId_Service,
     getPaymentSummary_Service, 
     getBillByPaymentStatus_Service } from "../services/bill.service.js";
     import {bookNewTestAppointment_Service} from "../services/client.service.js"

// See payment status - Get all bills for the logged-in client
export const seePaymentStatus_controller = tryCatchWrapper(async (req, res) => {
    const clientId = req.user.user_id;  // From JWT token
    const { status } = req.query;  // Optional filter: ?status=pending
    
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
});



// Other controller functions...
export const bookAppointment_controller = async (req, res) => {
    // TODO: Implement
   // res.status(501).json({ message: "Not implemented yet" });
   try{
   const {PatientID , testID, testDate , testStatus , paymentID , billID} = req.body
   const newAppointmentBooking = await bookNewTestAppointment_Service(PatientID , testID, testDate , testStatus , paymentID , billID)
   
     return res.status(200).json({message: "New Appointment is booked successfully ✌️"
    ,"Appointment Details" : newAppointmentBooking
   })
   }catch(error){
    throw new Error(`CONTROLLER ERROR | bookAppointment_controller  ${error}`)
   }
 
};




export const generateBill_controller = tryCatchWrapper(async (req, res) => {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented yet" });
});

export const updateReportValues_controller = tryCatchWrapper(async (req, res) => {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented yet" });
});

export const generateReports_controller = tryCatchWrapper(async (req, res) => {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented yet" });
});