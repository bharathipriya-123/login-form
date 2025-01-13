
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Signin.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    const loginData = { email, password };

    try {
      const response = await axios.post(
        'https://caf13db04067cf50d55c.free.beeceptor.com/api/users/',
        loginData
      );
      console.log('Login successful:', response.data);
      navigate('/success'); 
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Something went wrong');
      } else {
        setError('Network error: ' + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <h2>SignIn Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <label>Email Address:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={isLoading}>
             {/* if the loading state is true show signing inn if its false it shows signin */}
            {isLoading ? 'Signing in...' : 'Signin'}
          </button>
        </form>
      </div>
      <div className="right-side">
        <img
          src="https://cdn.pixabay.com/photo/2022/08/18/20/18/red-maple-leaves-7395624_1280.jpg"
          alt="Leaf"
          className="background-image"
        />
      </div>
    </div>
  );
}

export default LoginForm;