import './CSS/style.css';
import MainHeader from './MainHeader';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; 
import Dashboard from './Components/Dashboard';
import MainDashboard from './Components/MainDashboard';
import React, { useState } from 'react';
import {Navigate,useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();
  
const [isAuthenticated, setIsAuthenticated] = useState(false);


const handleLogin = (username, password) => {
  // Replace this logic with your authentication logic
  const validUsername = process.env.REACT_APP_USERNAME;
  const validPassword = process.env.REACT_APP_PASSWORD;

  if (username === validUsername && password === validPassword) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }

  navigate('/dashboard');
};



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
                <Login
                  onLogin={handleLogin}
                 
                />
              )
            }
          />

      <Route path="/dashboard" element={<MainDashboard isAuthenticated={isAuthenticated}/>} />
     
      </Routes>
      </div>
      {/* <footer>
        <MainFooter />
      </footer> */}
    </div>
  );
}

export default App;
