import { createAdmin_DAO, findAdminByEmail_DAO } from "../DAO/admin.dao.js";
import bcrypt from "bcrypt";


export const createAdmin_Service = async (adminData) => {
  try {
    const { userName, email, password, role } = adminData;
    //  console.log("Received data in createAdmin_Service:", { userName, email, role , password});
    if (!password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await createAdmin_DAO({
      userName,
      email,
      password: hashedPassword,
      role
    });

  } catch (error) {
    throw new Error(
      `SERVICE LAYER ERROR | createAdmin_Service | ${error.message}`
    );
  }
};

export const findAdminByEmail_Service = async (email) => {
  try {
    return await findAdminByEmail_DAO(email);   
    } catch (error) {
        throw new Error(`SERVICE LAYER ERROR | findAdminByEmail_Service | ${error.message}`)
    }
}
