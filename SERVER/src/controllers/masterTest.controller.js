import {
  createMasterTest_Service,
  getAllMasterTests_Service
} from "../services/masterTest.service.js";

export const createMasterTest = async (req, res) => {
  try {
    const test = await createMasterTest_Service(req.body);
    res.status(201).json({ success: true, data: test });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllMasterTests = async (req, res) => {
  try {
    const tests = await getAllMasterTests_Service();
    res.status(200).json({ success: true, data: tests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};