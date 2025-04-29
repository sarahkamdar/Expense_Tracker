import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './authContext';
import axios from 'axios';

const GlobalContext = createContext();

// Create axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INCOME':
            return {
                ...state,
                incomes: [...state.incomes, action.payload]
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };
        case 'DELETE_INCOME':
            return {
                ...state,
                incomes: state.incomes.filter(income => income._id !== action.payload)
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense._id !== action.payload)
            };
        case 'SET_INCOMES':
            return {
                ...state,
                incomes: action.payload
            };
        case 'SET_EXPENSES':
            return {
                ...state,
                expenses: action.payload
            };
        case 'SET_SELECTED_TRANSACTION':
            return {
                ...state,
                selectedTransaction: action.payload
            };
        default:
            return state;
    }
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, {
        incomes: [],
        expenses: [],
        selectedTransaction: null
    });

    const addIncome = async (income) => {
        try {
            const response = await api.post('/add-income', income);
            dispatch({ type: 'ADD_INCOME', payload: response.data });
        } catch (error) {
            console.error('Error adding income:', error);
            throw error;
        }
    };

    const addExpense = async (expense) => {
        try {
            const response = await api.post('/add-expense', expense);
            dispatch({ type: 'ADD_EXPENSE', payload: response.data });
        } catch (error) {
            console.error('Error adding expense:', error);
            throw error;
        }
    };

    const deleteIncome = async (id) => {
        try {
            await api.delete(`/delete-income/${id}`);
            dispatch({ type: 'DELETE_INCOME', payload: id });
        } catch (error) {
            console.error('Error deleting income:', error);
            throw error;
        }
    };

    const deleteExpense = async (id) => {
        try {
            await api.delete(`/delete-expense/${id}`);
            dispatch({ type: 'DELETE_EXPENSE', payload: id });
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    };

    const getIncomes = async () => {
        try {
            const response = await api.get('/get-incomes');
            dispatch({ type: 'SET_INCOMES', payload: response.data });
        } catch (error) {
            console.error('Error fetching incomes:', error);
            throw error;
        }
    };

    const getExpenses = async () => {
        try {
            const response = await api.get('/get-expenses');
            dispatch({ type: 'SET_EXPENSES', payload: response.data });
        } catch (error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }
    };

    const totalIncome = () => {
        return state.incomes.reduce((acc, income) => acc + income.amount, 0);
    };

    const totalExpenses = () => {
        return state.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...state.incomes, ...state.expenses];
        history.sort((a, b) => new Date(b.date) - new Date(a.date));
        return history;
    };

    const setSelectedTransaction = (transaction) => {
        dispatch({ type: 'SET_SELECTED_TRANSACTION', payload: transaction });
    };

    // Load initial data when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getIncomes();
            getExpenses();
        }
    }, []);

    return (
        <GlobalContext.Provider value={{
            incomes: state.incomes,
            expenses: state.expenses,
            selectedTransaction: state.selectedTransaction,
            addIncome,
            addExpense,
            deleteIncome,
            deleteExpense,
            getIncomes,
            getExpenses,
            totalIncome,
            totalExpenses,
            totalBalance,
            transactionHistory,
            setSelectedTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};