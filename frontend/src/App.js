import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Transactions from './Components/Transactions/Transactions';
import Categories from './Components/Categories/Categories';
import Accounts from './Components/Accounts/Accounts';
import Settings from './Components/Settings/Settings';
import { useGlobalContext } from './context/globalContext';
import { AuthProvider, useAuth } from './context/authContext';
import { GlobalProvider } from './context/globalContext';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {
  const [active, setActive] = useState(1);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <AppStyled bg={bg} className="App">
            {orbMemo}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <Dashboard />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <Dashboard />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/income"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <Income />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <Expenses />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <Transactions />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <Categories />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/accounts"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <Accounts />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <Settings />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </AppStyled>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : null;
};

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;