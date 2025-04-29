import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {
        totalExpenses,
        incomes,
        expenses,
        totalIncome,
        totalBalance,
        getIncomes,
        getExpenses,
    } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <div className="money">
                                    <p>{dollar} {totalIncome()}</p>
                                </div>
                            </div>
                            <div className="expense">
                                <h2>Total Expenses</h2>
                                <div className="money">
                                    <p>{dollar} {totalExpenses()}</p>
                                </div>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <div className="money">
                                    <p>{dollar} {totalBalance()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
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

    .stats-con {
        display: grid;
        grid-template-columns: 2fr 1fr;
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

        .chart-con {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            @media screen and (max-width: 1024px) {
                height: auto;
            }

            .amount-con {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin-top: 1rem;

                @media screen and (max-width: 768px) {
                    grid-template-columns: 1fr;
                }

                div {
                    text-align: center;
                    background: #fcf6f9;
                    border: 2px solid #ffffff;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1.5rem;
                    transition: transform 0.3s ease;

                    &:hover {
                        transform: translateY(-5px);
                    }

                    &.income {
                        background: #e6f7e6;
                        border-color: #42ad00;
                    }

                    &.expense {
                        background: #fff5f5;
                        border-color: #e74c3c;
                    }

                    &.balance {
                        background: #f0f7ff;
                        border-color: #3498db;
                    }

                    h2 {
                        font-size: clamp(1rem, 1.5vw, 1.2rem);
                        color: #555;
                        margin-bottom: 0.5rem;
                    }

                    p {
                        font-size: clamp(1.2rem, 2vw, 1.5rem);
                        font-weight: bold;
                        color: #333;
                    }
                }
            }
        }

        .history-con {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            width: 100%;
            height: 100%;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 0;
            }

            @media screen and (max-width: 1024px) {
                height: auto;
            }

            .salary-title {
                font-size: clamp(1rem, 1.5vw, 1.2rem);
                margin: 1.5rem 0;
                color: #555;
                display: flex;
                justify-content: space-between;

                span {
                    color: #42ad00;
                    font-weight: bold;
                }
            }

            .salary-item {
                background: #fcf6f9;
                border: 2px solid #ffffff;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;

                p {
                    font-weight: 600;
                    font-size: clamp(1.2rem, 2vw, 1.6rem);
                }
            }
        }
    }

    @media (max-width: 768px) {
        .stats-con {
            padding: 0.5rem;
        }

        .chart-con, .history-con {
            padding: 1rem;
        }
    }
`;

export default Dashboard;