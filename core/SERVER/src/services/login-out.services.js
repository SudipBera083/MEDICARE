import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { findAdminByEmail_DAO, compareAdminPassword_DAO } from "../DAO/admin.dao.js";
import { findClientByEmail_DAO, compareClientPassword_DAO } from "../DAO/client.dao.js";
import { signedJsonWebToken } from "../jwt/jsonwebtokenSign.js";

// Admin login service
export const adminLogin_Service = async (email, password) => {
    // Find admin in database
    const admin = await findAdminByEmail_DAO(email);
    if (!admin) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    // Verifying password
    const isPasswordValid = await compareAdminPassword_DAO(password, admin);
    if (!isPasswordValid) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    // Creating token with role
    const token = await signedJsonWebToken({
        id: admin._id,
        email: admin.email,
        role: 'admin'
    });

    // Return token and user data
    return {
        token,
        user: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: 'admin'
        }
    };
};


// Client login service
export const clientLogin_Service = async (ownerEmailID, password) => {
    // Find client in database
    const client = await findClientByEmail_DAO(ownerEmailID);
    if (!client) {
        throw { status: 401, message: 'Invalid credentials' };
    }
    // Verify password
    const isPasswordValid = await compareClientPassword_DAO(password, client);
    if (!isPasswordValid) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    // Create token with role
    const token = await signedJsonWebToken({
        id: client._id,
        email: client.email,
        role: 'client'
    });

    // Return token and user data 
    return {
        token,
        user: {
            id: client._id,
            name: client.ownerName,
            shopName: client.shopName,
            email: client.ownerEmailID,
            role: 'client'
        }
    };
}


/*
// Patient Login Service
export const patientLogin_Service = async (phone, password) => {
  // Find patient in database
  const patient = await authDao.findPatientByPhone(phone);
  if (!patient) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, patient.password);
  if (!isPasswordValid) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  // Create token with role
  const token = await signedJsonWebToken({ 
    id: patient._id, 
    phone: patient.phone,
    role: 'patient' 
  });

  // Return token and user data
  return {
    token,
    user: { 
      id: patient._id, 
      name: patient.name,
      phone: patient.phone,
      email: patient.email,
      role: 'patient' 
    }
  };
};*/