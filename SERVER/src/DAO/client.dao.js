import ClientModel from "../models/client.model.js"
import ClientSubscriptionModel from "../models/ClientSubscriptionModel.js"
import bcrypt from "bcrypt"


// registering the client in the database 
export const registerClientandSave_DAO = async (shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID,password, ownerGSTnumber) => {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hashing the password before storing it in the database.
    const newClient = await new ClientModel(
        {
            shopName,
            shopAddress,
            ownerPhoneNumber,
            ownerName,
            ownerEmailID,
            password: hashedPassword,
            ownerGSTnumber,
        }
    )
    return await newClient.save()
}
// finding client by shop name
export const getClientByShopName_DAO = async (shopName) => {
    return ClientModel.findOne({ shopName })
}


// Find client by email
export const findClientByEmail_DAO = async (ownerEmailID) => {
    return await ClientModel.findOne({ ownerEmailID });
};


// Compare client password
export const compareClientPassword_DAO = async (password, client) => {
    return await bcrypt.compare(password, client.password);
};



// --------------------------- Subscription  -------------------------------------

// saving the client subscription details in the database
export const saveClientSubscription_DAO = async (ownerEmailID, subscriptionType, subscriptionStartDate, subscriptionEndDate) => {
    const newSubscription = await new ClientSubscriptionModel({ 
        ownerEmailID, 
        subscriptionType, 
        subscriptionStartDate,
        subscriptionEndDate
    });
    return await newSubscription.save();
}

// finding the client subscription details by email
export const getClientSubscriptionByEmail_DAO = async (ownerEmailID) => {
    return await ClientSubscriptionModel.findOne({ ownerEmailID });
}



// updating the client subscription details in the database
export const updateClientSubscription_DAO = async (filter, updateData) => {
    return await ClientSubscriptionModel.findOneAndUpdate(
        filter,
        { $set: updateData },
        { new: true, runValidators: true }
    );
};



// deleting the client subscription details from the database
export const deleteClientSubscription_DAO = async (ownerEmailID) => {
    const result = await ClientSubscriptionModel.deleteOne({ ownerEmailID });
    // console.log("Delete result:", result);
    return result;
};



// checking if the client subscription is active or not
export const isClientSubscriptionActive_DAO = async (ownerEmailID) => {

    const subscription = await ClientSubscriptionModel.findOne({ ownerEmailID });

    if (!subscription) {
        return false;
    }

    const currentDate = new Date();
    return subscription.subscriptionStartDate <= currentDate &&
           subscription.subscriptionEndDate >= currentDate;
};




// getting the client subscription details by email
export const getClientSubscriptionDetails_DAO = async (ownerEmailID) => {
    return await ClientSubscriptionModel.findOne({ ownerEmailID });
}

// getting all the client subscription details from the database
export const getAllClientSubscriptions_DAO = async () => {
    return await ClientSubscriptionModel.find({});
}

