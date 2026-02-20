import mongoose from "mongoose";

const parameterSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    unit: {
        type: String,
        trim: true
    },

    normalRange: {
        type: String,
        trim: true
    },

    inputType: {
        type: String,
        enum: ["number", "text", "select"],
        default: "number"
    },

    allowedValues: {         //
        type: [String],  
        default: []
    }

}, { _id: false });

const testMasterSchema = new mongoose.Schema({

    testName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    parameters: {
        type: [parameterSchema],
        validate: [
            arrayLimit,
            "At least one parameter is required for a test"
        ]
    },

    testAvailability: {   // if in future wants to disable the test temporarily, basically trying to follow feature flag approach
        type: Boolean,
        default: true
    }

}, { timestamps: true });

function arrayLimit(val) { // custom validator to ensure at least one parameter is provided
    return val.length > 0;
}

const TestMaster = mongoose.model("TestMaster", testMasterSchema);

export default TestMaster;
