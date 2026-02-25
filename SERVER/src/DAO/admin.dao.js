import Admin from "../models/admin.model.js"
import ClientModel from "../models/client.model.js"
import bcrypt from "bcrypt"

// Create a new admin
export const createAdmin_DAO = async (adminData) => {
  const { userName, email, password, role } = adminData;

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("DAO LAYER | createAdmin_DAO | Received data:", {
    userName,
    email,
    role
  });

  return await Admin.create({
    userName,
    email,
    password: hashedPassword,
    role
  });
};



// Find admin by email
export const findAdminByEmail_DAO = async (email) => {
  return await Admin.findOne({ email });
};


export const getAllClients_DAO = async () => {
  try {
    return await ClientModel.find()
  }
  catch (error) {
    console.error(`DAO ERROR | admin.dao | getAllClients_DAO ${error}`)
    throw new Error(`DAO ERROR | getAllClients_DAO | ${error.message}`);
  }
}


  export const compareAdminPassword_DAO = async (password, admin) => {
    
    return await bcrypt.compare(password, admin.password);
  }
