import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {





  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    onLogin(username, password);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  // const handleLogin = () => {
  //   const envUsername = process.env.REACT_APP_USERNAME; 
  //   const envPassword = process.env.REACT_APP_PASSWORD;  
  //   if (username === envUsername && password === envPassword) {
  //     setIsAuthenticated(true);
  //     setErrorMessage('');
  //     navigate('/dashboard');
  //   } else {
  //     setIsAuthenticated(false);
  //     setErrorMessage('Invalid username or password');
  //   }
  // }

  return (
    <div  className='login-container'>
       <div className='logindiv'>
      <h1 className='login-h1'>Login</h1>
      <div>
        <label className='login-label'>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          className='login-input'
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className='login-label'>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          className='login-input'
          onChange={handleInputChange}
        />
      </div>
      <button className='login-button' onClick={handleLoginClick}>Login</button>
      {errorMessage && <div className='login-div.error'>{errorMessage}</div>}
    </div>
    </div>
   
  );
}

export default Login;