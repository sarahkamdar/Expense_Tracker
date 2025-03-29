const express = require('express');
const IncomeSchema = require('../models/IncomeModel');

const router = express.Router();

// Add Income
router.post('/add-income', async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        const income = new IncomeSchema({
            title,
            amount,
            category,
            description,
            date,
        });

        await income.save();
        res.status(200).json({ message: 'Income added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get All Incomes
router.get('/get-incomes', async (req, res) => {
    try {
        const incomes = await IncomeSchema.find();
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete Income
router.delete('/delete-income/:id', async (req, res) => {
    try {
        await IncomeSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;