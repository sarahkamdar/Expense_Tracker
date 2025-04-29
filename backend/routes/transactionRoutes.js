const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    addIncome, 
    getIncomes, 
    deleteIncome,
    addExpense,
    getExpenses,
    deleteExpense
} = require('../controllers/transactionController');

// Income routes
router.post('/add-income', protect, addIncome);
router.get('/get-incomes', protect, getIncomes);
router.delete('/delete-income/:id', protect, deleteIncome);

// Expense routes
router.post('/add-expense', protect, addExpense);
router.get('/get-expenses', protect, getExpenses);
router.delete('/delete-expense/:id', protect, deleteExpense);

module.exports = router; 