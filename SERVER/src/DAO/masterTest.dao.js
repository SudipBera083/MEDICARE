import MasterTest from "../models/masterTestSchema.model.js";

export const createMasterTest_DAO = async (data) => {
  return await MasterTest.create(data);
};

export const getAllMasterTests_DAO = async () => {
  return await MasterTest.find();
};

export const getMasterTestById_DAO = async (id) => {
  return await MasterTest.findById(id);
};