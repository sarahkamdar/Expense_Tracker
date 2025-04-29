const Income = require('../models/IncomeModel');
const Expense = require('../models/ExpenseModel');
const User = require('../models/UserModel');

// Income controllers
const addIncome = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;
        const userId = req.user._id;

        if (!title || !amount || !category) {
            return res.status(400).json({ message: 'Title, amount, and category are required' });
        }

        // Create income
        const income = await Income.create({
            title,
            amount,
            category,
            description: description || '',
            date: date || Date.now(),
            user: userId
        });

        // Add income to user's incomes array
        await User.findByIdAndUpdate(userId, {
            $push: { incomes: income._id }
        });

        res.status(201).json(income);
    } catch (error) {
        console.error('Add income error:', error);
        res.status(500).json({ message: 'Error adding income' });
    }
};

const getIncomes = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log('Loading incomes for user:', userId);
        const incomes = await Income.find({ user: userId })
            .sort({ date: -1 });
        console.log(`Found ${incomes.length} incomes for user ${userId}`);
        res.json(incomes);
    } catch (error) {
        console.error('Get incomes error:', error);
        res.status(500).json({ message: 'Error fetching incomes' });
    }
};

const deleteIncome = async (req, res) => {
    try {
        const userId = req.user._id;
        const income = await Income.findOne({ 
            _id: req.params.id,
            user: userId
        });
        
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        await income.remove();

        // Remove income from user's incomes array
        await User.findByIdAndUpdate(userId, {
            $pull: { incomes: income._id }
        });

        res.json({ message: 'Income deleted' });
    } catch (error) {
        console.error('Delete income error:', error);
        res.status(500).json({ message: 'Error deleting income' });
    }
};

// Expense controllers
const addExpense = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;
        const userId = req.user._id;

        if (!title || !amount || !category) {
            return res.status(400).json({ message: 'Title, amount, and category are required' });
        }

        // Create expense
        const expense = await Expense.create({
            title,
            amount,
            category,
            description: description || '',
            date: date || Date.now(),
            user: userId
        });

        // Add expense to user's expenses array
        await User.findByIdAndUpdate(userId, {
            $push: { expenses: expense._id }
        });

        res.status(201).json(expense);
    } catch (error) {
        console.error('Add expense error:', error);
        res.status(500).json({ message: 'Error adding expense' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log('Loading expenses for user:', userId);
        const expenses = await Expense.find({ user: userId })
            .sort({ date: -1 });
        console.log(`Found ${expenses.length} expenses for user ${userId}`);
        res.json(expenses);
    } catch (error) {
        console.error('Get expenses error:', error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const expense = await Expense.findOne({ 
            _id: req.params.id,
            user: userId
        });
        
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await expense.remove();

        // Remove expense from user's expenses array
        await User.findByIdAndUpdate(userId, {
            $pull: { expenses: expense._id }
        });

        res.json({ message: 'Expense deleted' });
    } catch (error) {
        console.error('Delete expense error:', error);
        res.status(500).json({ message: 'Error deleting expense' });
    }
};

module.exports = {
    addIncome,
    getIncomes,
    deleteIncome,
    addExpense,
    getExpenses,
    deleteExpense
}; 