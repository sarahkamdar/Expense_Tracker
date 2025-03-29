import React from 'react';
import { useGlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { getIncomes, getExpenses, totalBalance } = useGlobalContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <h2>Expense Tracker</h2>
            <ul>
                <li onClick={getIncomes}>Fetch Incomes</li>
                <li onClick={getExpenses}>Fetch Expenses</li>
                <li>Total Balance: ${totalBalance()}</li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </nav>
    );
};

export default Navbar;