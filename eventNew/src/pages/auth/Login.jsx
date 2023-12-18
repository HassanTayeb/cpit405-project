// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './auth.module.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/eventNew/API/user/login.php', {
        email: email,
        password: password,
      });

      if (response.data.success) {
        // Save user data in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data.user));

        // Use SweetAlert for success message
        Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonText: 'Continue',
        });

        // Redirect to /home
        // Note: You need to use a router (e.g., React Router) for navigation
        // Replace the following line with your router's navigation function
        window.location.href = '/home';
      } else {
        console.log(response);
        setError('Invalid email or password. Please try again.'); 
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 row">
                  <div className='col-md-6'>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  login
                </button>
                </div>
                <div className='col-md-6'>
                <a href='/register' className="btn btn-primary btn-block mt-4">
                  I don't have account
                 </a>
                </div>
                </div>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;