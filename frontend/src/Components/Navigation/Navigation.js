import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    dashboard, 
    transactions, 
    trend, 
    expenses, 
    categories, 
    accounts, 
    settings, 
    signout 
} from '../../utils/Icons';
import Button from '../Button/Button';
import { MenuItems } from '../MenuItems/MenuItems';

function Navigation({ active, setActive }) {
    const { setSelectedTransaction } = useGlobalContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        setSelectedTransaction(null);
        navigate(path);
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <NavStyled>
            <div className="user-con">
                <div className="text">
                    <h2>Expense Tracker</h2>
                </div>
            </div>
            <ul className="menu-items">
                <MenuItems
                    icon={dashboard}
                    title={'Dashboard'}
                    active={location.pathname === '/dashboard'}
                    onClick={() => handleNavigation('/dashboard')}
                />
                <MenuItems
                    icon={transactions}
                    title={'Transactions'}
                    active={location.pathname === '/transactions'}
                    onClick={() => handleNavigation('/transactions')}
                />
                <MenuItems
                    icon={trend}
                    title={'Income'}
                    active={location.pathname === '/income'}
                    onClick={() => handleNavigation('/income')}
                />
                <MenuItems
                    icon={expenses}
                    title={'Expenses'}
                    active={location.pathname === '/expenses'}
                    onClick={() => handleNavigation('/expenses')}
                />
                <MenuItems
                    icon={categories}
                    title={'Categories'}
                    active={location.pathname === '/categories'}
                    onClick={() => handleNavigation('/categories')}
                />
                <MenuItems
                    icon={accounts}
                    title={'Accounts'}
                    active={location.pathname === '/accounts'}
                    onClick={() => handleNavigation('/accounts')}
                />
                <MenuItems
                    icon={settings}
                    title={'Settings'}
                    active={location.pathname === '/settings'}
                    onClick={() => handleNavigation('/settings')}
                />
            </ul>
            <div className="bottom-nav">
                <Button
                    name={'Sign Out'}
                    icon={signout}
                    bPad={'1rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                    onClick={handleSignOut}
                />
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 300px;
    height: 100vh;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        .text {
            h2 {
            color: var(--color-accent);
            }
        }
    }
    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i {
                color: rgba(34, 34, 96, .6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }
    .bottom-nav {
        padding: 0 1rem;
    }
`;

export default Navigation;