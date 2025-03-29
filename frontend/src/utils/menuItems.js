import { dashboard, expenses, transactions, trend } from '../utils/Icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard', // Correct route
    },
    {
        id: 2,
        title: 'View Transactions',
        icon: transactions,
        link: '/dashboard', // Adjust if needed
    },
    {
        id: 3,
        title: 'Incomes',
        icon: trend,
        link: '/income', // Correct route
    },
    {
        id: 4,
        title: 'Expenses',
        icon: expenses,
        link: '/expenses', // Correct route
    },
];