import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/signup', { email, password });
            alert(response.data.message);
            navigate('/login'); // Redirect to login page
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup');
        }
    };

    return (
        <SignupStyled>
            <div className="form-container">
                <h2>Signup</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSignup}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Signup</button>
                </form>
                <p>
                    Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </SignupStyled>
    );
};

const SignupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;

  .form-container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;

    h2 {
      margin-bottom: 1rem;
    }

    .error {
      color: red;
      margin-bottom: 1rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      button {
        padding: 0.8rem;
        background: #42ad00;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    p {
      margin-top: 1rem;
      span {
        color: #42ad00;
        cursor: pointer;
      }
    }
  }
`;

export default Signup;