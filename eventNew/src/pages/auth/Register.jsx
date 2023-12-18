import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './auth.module.css';


// Register component
const Register = () => {
  // State variables for form fields and error handling
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);

  // Access the navigate function from React Router
  const navigate = useNavigate();

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the registration API endpoint
      const response = await axios.post('http://localhost:8080/eventNew/API/user/register.php', {
        username: username,
        email: email,
        password: password,
        phone: phone,
      });

      // Check if registration was successful
      if (response.data) {
        // Display a success message using SweetAlert
        Swal.fire({
          title: 'Registration Successful!',
          text: 'You have successfully registered!',
          icon: 'success',
          confirmButtonText: 'Continue',
        });

        // Redirect to the login page
        navigate('/');
      } else {
        // If registration was not successful, set an error message
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      // Handle any errors that occur during the registration process
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  // JSX for the Register component
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleRegister}>
                {/* Form fields */}
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
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
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                {/* Submit button */}
                <div className="col-12 row">
                  <div className='col-md-6'>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Register
                </button>
                </div>
                <div className='col-md-6'>
                <a href='/' className="btn btn-primary btn-block mt-4">
                  I have account
                </a>
                </div>
                </div>
              </form>
              {/* Display error message if registration fails */}
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
