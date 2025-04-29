const User = require('../models/UserModel');
const Income = require('../models/IncomeModel');
const Expense = require('../models/ExpenseModel');

const initializeUserData = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user
        const user = await User.findOne({ firebaseUid: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user already has data
        if (user.incomes.length > 0 || user.expenses.length > 0) {
            return res.status(200).json({ message: 'User data already initialized' });
        }

        // Create default categories
        const defaultCategories = {
            income: ['Salary', 'Freelance', 'Investments', 'Other'],
            expense: ['Food', 'Transportation', 'Entertainment', 'Bills', 'Shopping', 'Other']
        };

        // Store default categories in user document
        user.defaultCategories = defaultCategories;
        await user.save();

        res.status(200).json({ 
            message: 'User data initialized successfully',
            defaultCategories
        });
    } catch (error) {
        console.error('Error initializing user data:', error);
        res.status(500).json({ message: 'Error initializing user data' });
    }
};

module.exports = {
    initializeUserData
}; 