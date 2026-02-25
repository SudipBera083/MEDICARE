
import mongoose from "mongoose";

const clientSubscriptionModel = new mongoose.Schema({

    
   ownerEmailID: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    subscriptionType: {
        type: String,
        required: true,
        enum: ['demo', '3 months', '6 months', '12 months']
    },
    subscriptionStartDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    subscriptionEndDate: {
        type: Date,
        required: true
    }
    

}, { timestamps: true });

const ClientSubscription = mongoose.model("ClientSubscription", clientSubscriptionModel);

export default ClientSubscription;
