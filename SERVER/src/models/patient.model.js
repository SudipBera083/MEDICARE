
import mongoose from "mongoose"

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true,
    },
    patientPhoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(\+91)?[-\s]?[6-9]\d{9}$/.test(v.replace(/[-\s]/g, ''));
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PatientReport"
    }]

}, { timestamps: true })

export default mongoose.model("Patient", patientSchema)