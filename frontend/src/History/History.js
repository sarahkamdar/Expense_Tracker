import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import { dateFormat } from '../utils/dateFormat';

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) =>{
                const {_id, title, amount, type, date} = item
                return (
                    <div key={_id} className="history-item">
                        <div className="content">
                            <div className="inner-content">
                                <h5>{title}</h5>
                                <div className="text">
                                    <p>{dateFormat(date)}</p>
                                    <p>
                                        {type === 'expense' ? '-' : '+'}${amount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .content {
            flex: 1;
            display: flex;
            gap: 1rem;
            .inner-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: .3rem;
                h5 {
                    font-size: 1.1rem;
                    color: #222260;
                }
                .text {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    p {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        color: #222260;
                        opacity: 0.8;
                    }
                }
            }
        }
    }
`;

export default History