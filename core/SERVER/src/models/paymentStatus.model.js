import mongoose from "mongoose"

const paymentStatusSchema = new mongoose.Schema({

    paymentStatus: {
        type: String,
        required: true
        
    },
    paymentDate: {
        type: Date,
        required: true
    },

}, { timestamps: true })

const PaymentStatus = mongoose.model("PaymentStatus", paymentStatusSchema)

export default PaymentStatus