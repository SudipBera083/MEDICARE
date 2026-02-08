import {
    createTest_DAO,
    findTestById_DAO,
    findTestByName_DAO,
    getAllTests_DAO,
    getTestsByCategory_DAO,
    updateTest_DAO,
    deleteTest_DAO,
    hardDeleteTest_DAO,
    searchTests_DAO
} from "../DAO/test.dao.js";

// Add new test to catalog
export const addTest_controller = async (req, res) => {
    try {
        const { testName, testCode, testCategory, description, price, turnaroundTime, sampleType, fastingRequired } = req.body;

        // Validate required fields
        if (!testName || !testCategory || price === undefined) {
            return res.status(400).json({
                message: "Missing required fields",
                required: ["testName", "testCategory", "price"]
            });
        }

        // Check if test already exists
        const existingTest = await findTestByName_DAO(testName);
        if (existingTest) {
            return res.status(409).json({
                message: "Test with this name already exists",
                test: existingTest
            });
        }

        const newTest = await createTest_DAO({
            testName,
            testCode: testCode || testName.substring(0, 3).toUpperCase(),
            testCategory,
            description,
            price,
            turnaroundTime,
            sampleType,
            fastingRequired
        });

        return res.status(201).json({
            message: "Test added successfully ✅",
            test: newTest
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | addTest_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to add test",
            error: error.message
        });
    }
};

// Get all tests
export const getAllTests_controller = async (req, res) => {
    try {
        const { includeInactive } = req.query;
        const tests = await getAllTests_DAO(includeInactive === 'true');

        return res.status(200).json({
            message: "Tests retrieved successfully ✅",
            count: tests.length,
            tests
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getAllTests_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to get tests",
            error: error.message
        });
    }
};

// Get test by ID
export const getTestById_controller = async (req, res) => {
    try {
        const { id } = req.params;

        const test = await findTestById_DAO(id);
        if (!test) {
            return res.status(404).json({
                message: "Test not found"
            });
        }

        return res.status(200).json({
            message: "Test retrieved successfully ✅",
            test
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getTestById_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to get test",
            error: error.message
        });
    }
};

// Get tests by category
export const getTestsByCategory_controller = async (req, res) => {
    try {
        const { category } = req.params;

        const tests = await getTestsByCategory_DAO(category);

        return res.status(200).json({
            message: "Tests retrieved successfully ✅",
            count: tests.length,
            tests
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | getTestsByCategory_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to get tests by category",
            error: error.message
        });
    }
};

// Search tests
export const searchTests_controller = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                message: "Search query 'q' is required"
            });
        }

        const tests = await searchTests_DAO(q);

        return res.status(200).json({
            message: "Search completed ✅",
            count: tests.length,
            tests
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | searchTests_controller: ${error}`);
        return res.status(500).json({
            message: "Search failed",
            error: error.message
        });
    }
};

// Update test
export const updateTest_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedTest = await updateTest_DAO(id, updateData);
        if (!updatedTest) {
            return res.status(404).json({
                message: "Test not found"
            });
        }

        return res.status(200).json({
            message: "Test updated successfully ✅",
            test: updatedTest
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | updateTest_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to update test",
            error: error.message
        });
    }
};

// Delete test (soft delete)
export const deleteTest_controller = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTest = await deleteTest_DAO(id);
        if (!deletedTest) {
            return res.status(404).json({
                message: "Test not found"
            });
        }

        return res.status(200).json({
            message: "Test deactivated successfully ✅",
            test: deletedTest
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | deleteTest_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to delete test",
            error: error.message
        });
    }
};

// Hard delete test (permanent)
export const hardDeleteTest_controller = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTest = await hardDeleteTest_DAO(id);
        if (!deletedTest) {
            return res.status(404).json({
                message: "Test not found"
            });
        }

        return res.status(200).json({
            message: "Test permanently deleted ✅",
            test: deletedTest
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | hardDeleteTest_controller: ${error}`);
        return res.status(500).json({
            message: "Failed to delete test",
            error: error.message
        });
    }
};
