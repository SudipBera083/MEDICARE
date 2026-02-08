import Admin from "../models/admin.model.js"
import ClientModel from "../models/client.model.js"
import bcrypt from "bcrypt"

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
