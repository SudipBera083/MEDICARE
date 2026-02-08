import Test from "../models/test.model.js";

// Create new test
export const createTest_DAO = async (testData) => {
    return await Test.create(testData);
};

// Find test by ID
export const findTestById_DAO = async (id) => {
    return await Test.findById(id);
};

// Find test by name
export const findTestByName_DAO = async (testName) => {
    return await Test.findOne({ testName });
};

// Get all tests (active only by default)
export const getAllTests_DAO = async (includeInactive = false) => {
    const filter = includeInactive ? {} : { isActive: true };
    return await Test.find(filter).sort({ testCategory: 1, testName: 1 });
};

// Get tests by category
export const getTestsByCategory_DAO = async (category) => {
    return await Test.find({ testCategory: category, isActive: true }).sort({ testName: 1 });
};

// Update test
export const updateTest_DAO = async (id, updateData) => {
    return await Test.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

// Delete test (soft delete by setting isActive to false)
export const deleteTest_DAO = async (id) => {
    return await Test.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

// Hard delete test
export const hardDeleteTest_DAO = async (id) => {
    return await Test.findByIdAndDelete(id);
};

// Search tests by name
export const searchTests_DAO = async (searchQuery) => {
    const regex = new RegExp(searchQuery, 'i');
    return await Test.find({
        testName: regex,
        isActive: true
    }).sort({ testName: 1 });
};
