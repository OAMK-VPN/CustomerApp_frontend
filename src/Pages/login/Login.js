import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

import { getAllCredentials } from "../../userCredentials";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const credentials = getAllCredentials();

  const printCredentials = () => { console.log(credentials); };



  const loginHandler = (e) => {
    e.preventDefault();
    printCredentials();
    let isAuthenticated = false;
    let userName = '';

    credentials.forEach((credential) => {
      if (email === credential.email && password === credential.password) {
        isAuthenticated = true;
        userName = credential.userName;
      }
    });

    if (isAuthenticated) {
      navigate(`/${userName}/ParcelsView`);
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };





  return (
    <div className={styles.container}>
      
      <main>
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        {error && <p className="text-danger">{error}</p>}
      <Link to={`/RestorePassword`}> Restore Password</Link> <br />
      <Link to={`/CreateAccount`}> Create Account</Link>
      </main>
    </div>
  );
};

export default Login;
