import mongoose from "mongoose"

const billSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientModel"
    },
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    billAmount: {
        type: Number,
        required: true
    },
    billDate: {
        type: Date,
        required: true
    },
    billStatus: {
        type: String,
        required: true,
        enum: [`pending`, `paid`, `partially paid`]
    },


})

const Bill = mongoose.model("Bill", billSchema)

export default Bill