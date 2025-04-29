import React, { useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { plus, trash } from '../../utils/Icons';

function Categories() {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Salary', type: 'income' },
        { id: 2, name: 'Freelancing', type: 'income' },
        { id: 3, name: 'Investments', type: 'income' },
        { id: 4, name: 'Stocks', type: 'income' },
        { id: 5, name: 'Bitcoin', type: 'income' },
        { id: 6, name: 'Bank Transfer', type: 'income' },
        { id: 7, name: 'Youtube', type: 'income' },
        { id: 8, name: 'Other', type: 'income' },
        { id: 9, name: 'Food', type: 'expense' },
        { id: 10, name: 'Shopping', type: 'expense' },
        { id: 11, name: 'House', type: 'expense' },
        { id: 12, name: 'Transport', type: 'expense' },
        { id: 13, name: 'Entertainment', type: 'expense' },
        { id: 14, name: 'Phone', type: 'expense' },
        { id: 15, name: 'Toiletries', type: 'expense' },
        { id: 16, name: 'Other', type: 'expense' }
    ]);

    const [newCategory, setNewCategory] = useState({ name: '', type: 'income' });

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory.name.trim()) {
            setCategories([...categories, { id: Date.now(), ...newCategory }]);
            setNewCategory({ name: '', type: 'income' });
        }
    };

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    return (
        <CategoriesStyled>
            <InnerLayout>
                <h1>Categories</h1>
                <div className="categories-content">
                    <div className="form-container">
                        <form onSubmit={handleAddCategory}>
                            <div className="input-control">
                                <input
                                    type="text"
                                    value={newCategory.name}
                                    name="name"
                                    placeholder="Category Name"
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="selects input-control">
                                <select
                                    required
                                    value={newCategory.type}
                                    name="type"
                                    onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div className="submit-btn">
                                <button type="submit">
                                    {plus} Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="categories">
                        <h2>Income Categories</h2>
                        <div className="category-list">
                            {categories
                                .filter(category => category.type === 'income')
                                .map(category => (
                                    <div key={category.id} className="category-item">
                                        <span>{category.name}</span>
                                        <button onClick={() => handleDeleteCategory(category.id)}>
                                            {trash}
                                        </button>
                                    </div>
                                ))}
                        </div>
                        <h2>Expense Categories</h2>
                        <div className="category-list">
                            {categories
                                .filter(category => category.type === 'expense')
                                .map(category => (
                                    <div key={category.id} className="category-item">
                                        <span>{category.name}</span>
                                        <button onClick={() => handleDeleteCategory(category.id)}>
                                            {trash}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </CategoriesStyled>
    );
}

const CategoriesStyled = styled.div`
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

    .categories-content {
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

        .categories {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 0;
            }

            h2 {
                margin-bottom: 1rem;
                color: #333;
                font-size: 1.2rem;
            }

            .category-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 2rem;

                .category-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    background: #f8f9fa;
                    border-radius: 5px;
                    transition: all 0.3s ease;

                    &:hover {
                        background: #e9ecef;
                    }

                    span {
                        color: #333;
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

    @media (max-width: 768px) {
        .categories-content {
            padding: 0.5rem;
        }

        .form-container, .categories {
            padding: 1rem;
        }
    }
`;

export default Categories; 