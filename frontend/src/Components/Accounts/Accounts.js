import React, { useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { plus, trash } from '../../utils/Icons';

function Accounts() {
    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Main Account', balance: 5000, type: 'checking' },
        { id: 2, name: 'Savings', balance: 10000, type: 'savings' },
        { id: 3, name: 'Credit Card', balance: -2000, type: 'credit' }
    ]);

    const [newAccount, setNewAccount] = useState({
        name: '',
        balance: '',
        type: 'checking'
    });

    const handleAddAccount = (e) => {
        e.preventDefault();
        if (newAccount.name.trim() && newAccount.balance) {
            setAccounts([...accounts, {
                id: Date.now(),
                ...newAccount,
                balance: parseFloat(newAccount.balance)
            }]);
            setNewAccount({ name: '', balance: '', type: 'checking' });
        }
    };

    const handleDeleteAccount = (id) => {
        setAccounts(accounts.filter(account => account.id !== id));
    };

    const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);

    return (
        <AccountsStyled>
            <InnerLayout>
                <h1>Accounts</h1>
                <div className="accounts-content">
                    <div className="form-container">
                        <form onSubmit={handleAddAccount}>
                            <div className="input-control">
                                <input
                                    type="text"
                                    value={newAccount.name}
                                    name="name"
                                    placeholder="Account Name"
                                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-control">
                                <input
                                    type="number"
                                    value={newAccount.balance}
                                    name="balance"
                                    placeholder="Initial Balance"
                                    onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="selects input-control">
                                <select
                                    required
                                    value={newAccount.type}
                                    name="type"
                                    onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                                >
                                    <option value="checking">Checking</option>
                                    <option value="savings">Savings</option>
                                    <option value="credit">Credit Card</option>
                                </select>
                            </div>
                            <div className="submit-btn">
                                <button type="submit">
                                    {plus} Add Account
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="accounts">
                        <div className="total-balance">
                            <h2>Total Balance</h2>
                            <span className={totalBalance >= 0 ? 'positive' : 'negative'}>
                                ${Math.abs(totalBalance).toFixed(2)}
                            </span>
                        </div>
                        <div className="accounts-list">
                            {accounts.map(account => (
                                <div key={account.id} className="account-item">
                                    <div className="account-info">
                                        <h3>{account.name}</h3>
                                        <p className="account-type">{account.type}</p>
                                    </div>
                                    <div className="account-balance">
                                        <span className={account.balance >= 0 ? 'positive' : 'negative'}>
                                            ${Math.abs(account.balance).toFixed(2)}
                                        </span>
                                        <button onClick={() => handleDeleteAccount(account.id)}>
                                            {trash}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </AccountsStyled>
    );
}

const AccountsStyled = styled.div`
    height: 100vh;
    overflow: hidden;
    padding: 1rem;
    margin: 0;
    background: #f9f9f9;
    width: calc(100% - 300px);
    margin-left: 300px;
    position: fixed;
    top: 0;
    right: 0;

    @media screen and (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        padding: 0.5rem;
        position: relative;
        height: auto;
        overflow-y: auto;
    }

    h1 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        font-weight: bold;
        color: #333;
    }

    .accounts-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
        padding: 1rem;
        width: 100%;
        height: calc(100vh - 150px);
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 0;
        }

        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            height: auto;
        }

        .form-container {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            height: fit-content;

            form {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                input, select {
                    font-family: inherit;
                    font-size: inherit;
                    outline: none;
                    border: 1px solid #e0e0e0;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    background: white;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    color: #333;
                }

                .submit-btn {
                    button {
                        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                        &:hover {
                            background: #42ad00 !important;
                        }
                    }
                }
            }
        }

        .accounts {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 0;
            }

            .total-balance {
                text-align: center;
                margin-bottom: 2rem;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 10px;

                h2 {
                    color: #666;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                }

                span {
                    font-size: 2rem;
                    font-weight: bold;

                    &.positive {
                        color: #42ad00;
                    }

                    &.negative {
                        color: #e74c3c;
                    }
                }
            }

            .accounts-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .account-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                    transition: all 0.3s ease;

                    &:hover {
                        background: #e9ecef;
                    }

                    .account-info {
                        h3 {
                            color: #333;
                            margin-bottom: 0.25rem;
                        }

                        .account-type {
                            color: #666;
                            font-size: 0.9rem;
                            text-transform: capitalize;
                        }
                    }

                    .account-balance {
                        display: flex;
                        align-items: center;
                        gap: 1rem;

                        span {
                            font-weight: bold;
                            font-size: 1.1rem;

                            &.positive {
                                color: #42ad00;
                            }

                            &.negative {
                                color: #e74c3c;
                            }
                        }

                        button {
                            background: none;
                            border: none;
                            color: #e74c3c;
                            cursor: pointer;
                            transition: color 0.3s ease;

                            &:hover {
                                color: #c0392b;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .accounts-content {
            padding: 0.5rem;
        }

        .form-container, .accounts {
            padding: 1rem;
        }
    }
`;

export default Accounts; 