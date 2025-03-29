import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import { AuthProvider, useAuth } from './context/authContext';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [active, setActive] = useState(1);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppStyled bg={bg} className="App">
          {orbMemo}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Navigate to="/dashboard" />
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
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AppStyled>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
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