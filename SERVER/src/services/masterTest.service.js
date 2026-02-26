import {
  createMasterTest_DAO,
  getAllMasterTests_DAO
} from "../DAO/masterTest.dao.js";

export const createMasterTest_Service = async (data) => {
  return await createMasterTest_DAO(data);
};

export const getAllMasterTests_Service = async () => {
  return await getAllMasterTests_DAO();
};