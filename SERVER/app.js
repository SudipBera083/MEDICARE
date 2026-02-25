import express from "express"
import cors from "cors"
import dotenv from "dotenv"
//import cookieParser from "cookie-parser"
import connectDB from "./src/config/database.config.js"
import adminRoute from "./src/routes/admin.route.js"
 import clientRoute from "./src/routes/client.route.js"
// import patientRoute from "./src/routes/patient.route.js"
// import testAppointmentRoute from "./src/routes/testAppointment.route.js"
// import billRoute from "./src/routes/bill.route.js"
// import paymentStatusRoute from "./src/routes/paymentStatus.route.js"
// import pathologyServicesRoute from "./src/routes/pathologyServices.route.js"
import  tryCatchWrapper  from "./src/utility/tryCatchWrapper.util.js";
import { saveClientSubscription_Service, getClientSubscriptionByEmail_Service, updateClientSubscription_Service, deleteClientSubscription_Service, isClientSubscriptionActive_Service, getAllClientSubscriptions_Service } from "./src/services/client.service.js";

dotenv.config();


const app = express()




const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(cookieParser()) 

app.use(`/api/admin_route`, adminRoute)
 app.use(`/api/client_route`, clientRoute)
// app.use(`/api/patient_route`, patientRoute)
// app.use(`/api/testAppointment_route`, testAppointmentRoute)
// app.use(`/api/bill_route`, billRoute)
// app.use(`/api/paymentStatus_route`, paymentStatusRoute)
// app.use(`/api/pathologyServices_route`, pathologyServicesRoute)


// subscription routes
app.post("/api/client_route/subscription" , tryCatchWrapper(saveClientSubscription_Service))
app.get("/api/client_route/subscription" , tryCatchWrapper(getClientSubscriptionByEmail_Service))
app.put("/api/client_route/subscription" , tryCatchWrapper(updateClientSubscription_Service))
app.delete("/api/client_route/subscription" , tryCatchWrapper(deleteClientSubscription_Service))
app.get("/api/client_route/subscription/active" , tryCatchWrapper(isClientSubscriptionActive_Service))
app.get("/api/client_route/subscriptions" , tryCatchWrapper(getAllClientSubscriptions_Service))



connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

