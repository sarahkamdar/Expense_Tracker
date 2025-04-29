import React from 'react';
import styled from 'styled-components';
import { dollar } from '../../utils/Icons';

function ViewTransaction({ transaction, onClose }) {
    const { title, amount, date, category, description, type } = transaction;

    return (
        <ViewTransactionStyled>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Transaction Details</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="transaction-details">
                    <div className="detail-item">
                        <h3>Title</h3>
                        <p>{title}</p>
                    </div>
                    <div className="detail-item">
                        <h3>Amount</h3>
                        <p className={type === 'income' ? 'income' : 'expense'}>
                            {dollar} {amount}
                        </p>
                    </div>
                    <div className="detail-item">
                        <h3>Category</h3>
                        <p>{category}</p>
                    </div>
                    <div className="detail-item">
                        <h3>Date</h3>
                        <p>{new Date(date).toLocaleDateString()}</p>
                    </div>
                    <div className="detail-item">
                        <h3>Description</h3>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </ViewTransactionStyled>
    );
}

const ViewTransactionStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .modal-content {
        background: white;
        border-radius: 10px;
        padding: 2rem;
        width: 90%;
        max-width: 500px;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        position: relative;

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;

            h2 {
                color: #333;
                font-size: 1.8rem;
                margin: 0;
            }

            .close-btn {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                padding: 0.5rem;
                line-height: 1;
                transition: color 0.3s ease;

                &:hover {
                    color: #e74c3c;
                }
            }
        }

        .transaction-details {
            .detail-item {
                margin-bottom: 1.5rem;

                h3 {
                    color: #666;
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                }

                p {
                    color: #333;
                    font-size: 1.2rem;
                    margin: 0;

                    &.income {
                        color: #42ad00;
                    }

                    &.expense {
                        color: #e74c3c;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            padding: 1.5rem;
        }
    }
`;

export default ViewTransaction; 