import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { plus } from '../../utils/Icons';

function IncomeForm() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: ''
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        addIncome(inputState);
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: ''
        });
    };

    return (
        <IncomeFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                    required
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name="amount"
                    placeholder={'Salary Amount'}
                    onChange={handleInput('amount')}
                    required
                />
            </div>
            <div className="input-control">
                <input
                    type="date"
                    id="date"
                    value={date}
                    name="date"
                    onChange={handleInput('date')}
                    required
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>Select Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder="Add a Reference"
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                    required
                ></textarea>
            </div>
            <div className="submit-btn">
                <button type="submit">
                    {plus} Add Income
                </button>
            </div>
        </IncomeFormStyled>
    );
}

const IncomeFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: 1px solid #e0e0e0;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        background: white;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: #333;
        &::placeholder {
            color: #999;
        }
    }

    .input-control {
        input {
            width: 100%;
        }
    }

    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: #333;
            &:focus, &:active {
                color: #42ad00;
            }
        }
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: #42ad00 !important;
            }
        }
    }

    .error {
        color: #e74c3c;
        font-size: 0.9rem;
        text-align: center;
    }
`;

export default IncomeForm; 