const express = require('express');
const ExpenseSchema = require('../models/ExpenseModel');

const router = express.Router();

// Add Expense
router.post('/add-expense', async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date,
        });

        await expense.save();
        res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get All Expenses
router.get('/get-expenses', async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete Expense
router.delete('/delete-expense/:id', async (req, res) => {
    try {
        await ExpenseSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;