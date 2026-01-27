import mongoose from "mongoose";

const clientDetailsModelSchema = new mongoose.Schema({

    shopName: {          // ➡️ in the user creation  need to add .toUpperCase()
        type: String,
        required: true,
        unique: true,
    },
    shopAddress: {          
        type: String,
        required: true,
    },
    ownerName: {          // ➡️ in the user creation  need to add .toUpperCase()
        type: String,
        required: true,
        uppercase: true,
    },
    ownerPhoneNumeber: {
        type: Number,
        required: true,
        min: [10, `this is not a valid number`],
        max: [10, `this is not a valid number`],
        unique: true
    },
    ownerEmailID: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    ownerGSTnumber: {
        type: String,
        unique: true

    }


}, { timestamps: true })

const ClientModel = mongoose.model("clientDetailsModel", clientDetailsModelSchema)

export default ClientModel;