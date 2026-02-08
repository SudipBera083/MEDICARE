
import Bill from "../models/bill.model.js";

// DAO to get bills by client ID

export const getBillsByClientId_DAO = async(clientId)=>{
try{
    return await Bill.find({ clientId: clientId })
    .populate("patientId", "firstName lastName patientPhoneNumber")  // ✅ Correct - lowercase 'd'
    .sort({ createdAt: -1 });  // latest bill first
}catch(error){
    throw new Error(`DAO ERROR: getBillsByClientId_DAO failed | clientId=${clientId} | ${error.message}`);
}
}


//getting bills by status and clientId
export const getBillbyClinetIdandPaymentStatus_DAO = async (clientId, status) => {
  try {
    return await Bill.find({ clientId: clientId, billStatus: status })  // ✅ Correct
      .populate("patientId", "firstName lastName patientPhoneNumber")
      .sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(
      `DAO ERROR: getBillbyPaymentStatus_DAO failed | clientId=${clientId}, status=${status} | ${error.message}`
    );
  }
};


// get payment summary for a client 
export const getPaymentSummary_DAO = async (clientId) => {
    try{
        return await Bill.aggregate([
            {$match: {clientId: clientId}},
            {
                $group: {
                    _id: "$billStatus",
                    totalAmount: {$sum: "$billAmount"},
                    count: {$sum: 1}
                }
            }
        ]);
    }catch(error){
        throw new Error(`DAO ERROR: getPaymentSummary_DAO failed | clientId=${clientId} | ${error.message}`);
    }
}

export const findBillById_DAO = async (billId) => {
    try {
        return await Bill.findById(billId);
    } catch (error) {
        throw new Error(`DAO ERROR: findBillById_DAO failed | billId=${billId} | ${error.message}`);
    }
}
