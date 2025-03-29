import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password });
        localStorage.setItem('token', `Bearer ${response.data.token}`); // Store the token with "Bearer" prefix
        navigate('/dashboard');
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'An error occurred');
    }
};

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginStyled>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleGoogleLogin} className="google-login">
          Login with Google
        </button>
        <p>
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
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

    .google-login {
      margin-top: 1rem;
      background: #4285f4;
      color: white;
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

export default Login;