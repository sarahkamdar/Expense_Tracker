import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, googleAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button 
          onClick={handleGoogleLogin} 
          className="google-login"
          disabled={loading}
        >
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
    width: 100%;
    max-width: 400px;

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
        font-size: 1rem;

        &:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }
      }

      button {
        padding: 0.8rem;
        background: #42ad00;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.3s ease;

        &:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        &:hover:not(:disabled) {
          background: #3a9600;
        }
      }
    }

    .error-message {
      color: #ff4444;
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }

    .google-login {
      margin-top: 1rem;
      background: #4285f4;
      color: white;

      &:hover:not(:disabled) {
        background: #357abd;
      }
    }

    p {
      margin-top: 1rem;
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

export default Login;