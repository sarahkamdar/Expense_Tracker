import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ViewTransaction from '../ViewTransaction/ViewTransaction';

function Transactions() {
    const { 
        incomes, 
        expenses, 
        selectedTransaction, 
        setSelectedTransaction,
        deleteIncome,
        deleteExpense
    } = useGlobalContext();

    const handleViewTransaction = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseView = () => {
        setSelectedTransaction(null);
    };

    // Combine and sort all transactions
    const allTransactions = [...incomes, ...expenses].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="transactions-content">
                    <div className="transactions">
                        {allTransactions.map((transaction) => {
                            const { _id, title, amount, date, category, description, type } = transaction;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor={type === 'expense' ? 'var(--color-green)' : 'var(--color-green)'}
                                    deleteItem={type === 'expense' ? deleteExpense : deleteIncome}
                                    onView={handleViewTransaction}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
            {selectedTransaction && (
                <ViewTransaction
                    transaction={selectedTransaction}
                    onClose={handleCloseView}
                />
            )}
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
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

    .transactions-content {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
        height: calc(100vh - 150px);
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 0;
        }

        @media screen and (max-width: 768px) {
            height: auto;
            padding: 1rem;
        }
    }

    .transactions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export default Transactions; 