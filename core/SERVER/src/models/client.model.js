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
   
    ownerPhoneNumber: {
        type: String,        //  Store as string
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^(\+91)?[-\s]?[6-9]\d{9}$/.test(v.replace(/[-\s]/g, ''));
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    ownerEmailID: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
     password: {
        type: String,
        required: true,
    },
    ownerGSTnumber: {
        type: String,
        unique: true

    },
    role: {
        type: String,
        default: 'client',
        enum: ['client']
    }                           // need to add subscription

}, { timestamps: true })

const ClientModel = mongoose.model("ClientModel", clientDetailsModelSchema)

export default ClientModel;