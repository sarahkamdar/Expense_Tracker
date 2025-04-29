import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import IncomeForm from './IncomeForm';
import ViewTransaction from '../ViewTransaction/ViewTransaction';

function Income() {
    const {incomes, getIncomes, deleteIncome, totalIncome, selectedTransaction, setSelectedTransaction} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [getIncomes])

    const handleViewTransaction = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseView = () => {
        setSelectedTransaction(null);
    };

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <div className="stats-con">
                    <div className="form-container">
                        <IncomeForm />
                    </div>
                    <div className="incomes">
                        <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                                onView={handleViewTransaction}
                            />
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
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
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
        }

        .incomes {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 0;
            }

            .total-income {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #f0fff4;
                border: 2px solid #42ad00;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1.5rem;
                margin-bottom: 2rem;
                font-size: clamp(1.2rem, 2vw, 2rem);
                gap: 0.5rem;
                transition: transform 0.3s ease;

                &:hover {
                    transform: translateY(-5px);
                }

                span {
                    font-size: clamp(1.5rem, 3vw, 2.5rem);
                    font-weight: 800;
                    color: #42ad00;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .stats-con {
            padding: 0.5rem;
        }

        .form-container, .incomes {
            padding: 1rem;
        }
    }
`;

export default Income