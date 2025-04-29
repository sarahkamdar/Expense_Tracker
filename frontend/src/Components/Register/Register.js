import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { users } from '../../utils/Icons';
import { useAuth } from '../../context/authContext';

function Register() {
    const navigate = useNavigate();
    const { register, googleAuth } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const result = await register(formData.name, formData.email, formData.password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setError('');
        setLoading(true);

        try {
            const result = await googleAuth();
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.error('Google registration error:', err);
            setError('Google registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegisterStyled>
            <div className="register-container">
                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Join us to start tracking your expenses</p>
                </div>

                <div className="register-options">
                    <button 
                        className="google-btn" 
                        onClick={handleGoogleRegister}
                        disabled={loading}
                    >
                        <span className="google-icon">{users}</span>
                        Continue with Google
                    </button>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button 
                            type="submit" 
                            className="register-btn"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                </div>

                <div className="register-footer">
                    <p>Already have an account? <span onClick={() => navigate('/login')}>Sign in</span></p>
                </div>
            </div>
        </RegisterStyled>
    );
}

const RegisterStyled = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;
    padding: 1rem;

    .register-container {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        width: 100%;
        max-width: 400px;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

        @media screen and (max-width: 480px) {
            padding: 1.5rem;
        }

        .register-header {
            text-align: center;
            margin-bottom: 2rem;

            h1 {
                color: #333;
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }

            p {
                color: #666;
                font-size: 1rem;
            }
        }

        .register-options {
            .google-btn {
                width: 100%;
                padding: 0.8rem;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                background: white;
                color: #333;
                font-size: 1rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                transition: all 0.3s ease;

                &:hover:not(:disabled) {
                    background: #f5f5f5;
                }

                &:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .google-icon {
                    font-size: 1.2rem;
                }
            }

            .divider {
                display: flex;
                align-items: center;
                text-align: center;
                margin: 1.5rem 0;

                &::before,
                &::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #e0e0e0;
                }

                span {
                    padding: 0 1rem;
                    color: #666;
                    font-size: 0.9rem;
                }
            }

            .register-form {
                .form-group {
                    margin-bottom: 1.5rem;

                    label {
                        display: block;
                        margin-bottom: 0.5rem;
                        color: #333;
                        font-size: 0.9rem;
                    }

                    input {
                        width: 100%;
                        padding: 0.8rem;
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        font-size: 1rem;
                        outline: none;
                        transition: border-color 0.3s ease;

                        &:focus {
                            border-color: #42ad00;
                        }

                        &:disabled {
                            background: #f5f5f5;
                            cursor: not-allowed;
                        }

                        &::placeholder {
                            color: #999;
                        }
                    }
                }

                .error-message {
                    color: #e74c3c;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .register-btn {
                    width: 100%;
                    padding: 0.8rem;
                    border: none;
                    border-radius: 8px;
                    background: #42ad00;
                    color: white;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.3s ease;

                    &:hover:not(:disabled) {
                        background: #3a9a00;
                    }

                    &:disabled {
                        opacity: 0.7;
                        cursor: not-allowed;
                    }
                }
            }
        }

        .register-footer {
            text-align: center;
            margin-top: 2rem;
            color: #666;
            font-size: 0.9rem;

            span {
                color: #42ad00;
                cursor: pointer;
                font-weight: 500;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

export default Register; 