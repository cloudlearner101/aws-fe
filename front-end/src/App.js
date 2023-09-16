import './CSS/style.css';
import MainHeader from './MainHeader';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; 
import Dashboard from './Components/Dashboard';
import MainDashboard from './Components/MainDashboard';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import MainFooter from './MainFooter';

function App() {
  const navigate = useNavigate();
  
  // Check if authentication state is stored in localStorage
  const initialAuthState = localStorage.getItem('isAuthenticated') === 'true';
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);

  const handleLogin = (username, password) => {
    // Replace this logic with your authentication logic
    const validUsername = process.env.REACT_APP_USERNAME;
    const validPassword = process.env.REACT_APP_PASSWORD;

    if (username === validUsername && password === validPassword) {
      // Set authentication state and store it in localStorage
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      alert("Please enter the valid credentials")
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false');
    }

    navigate('/dashboard');
  };


  useEffect(() => {
    // Clear authentication state from localStorage when component unmounts
    return () => {
      // Do not clear localStorage on unmount
    };
  }, []);

  return (
    <div className="body">
      <header>
        <MainHeader />
      </header>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin}/>} />
          <Route path="/dashboard" element={<MainDashboard isAuthenticated={isAuthenticated} navigate={navigate}/>} />
        </Routes>
      </div>
      <footer>
        <MainFooter/>
      </footer>
    </div>
  );
}

export default App;
