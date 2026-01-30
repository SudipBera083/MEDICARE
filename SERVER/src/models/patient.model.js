import mongoose from "mongoose"

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    patientPhoneNumber: {
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

    // add all the services he opted till now in an array format 
}, { timestamps: true })

const Patient = mongoose.model("Patient", patientSchema)

export default Patient
