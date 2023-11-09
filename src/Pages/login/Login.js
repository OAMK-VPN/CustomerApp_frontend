import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

import { getAllCredentials } from "../../userCredentials";
import { useNavigate } from 'react-router-dom';
import login_lock from "../../assets/login_lock.svg"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const credentials = getAllCredentials();

  const printCredentials = () => { console.log(credentials); };
  const UserInputHandler = (e) => {
    const sanitaziedInput = e.target.value.replace(/[^A-Za-z0-9@.]/g, '');
    setEmail(sanitaziedInput);
  }


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
      alert('Invalid email or password. Please try again.');
    }
  };





  return (
    <div className={styles.parent_form}>
      <form className={styles.form} onSubmit={loginHandler}>
      <img 
      src = {login_lock}
      style={{ width: '25%', height: 'auto', paddingTop: "25%", paddingBottom: "10%"}}
      />
      <div>
        <label className={styles.label} htmlFor="email">Email</label><br/>
        <input

          className={styles.login_input}
          id = "email"
          value={email}
          onChange={UserInputHandler}
          name="email"
          type="email"
          />
      </div>

      <div>
        <label className={styles.label} htmlFor="password">Password</label><br/>
        <input
          className={styles.login_input}
          id = "password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          name="password"
          type="password"
        />
      </div>
      
      <button className={styles.login_button}>Login</button> <br />
      <Link to={`/RestorePassword`} className={styles.restore_password}>Restore Password</Link> <br />
      <Link to={`/CreateAccount`} className={styles.create_account}>Create Account</Link>
    
    </form>
    </div>
  );
};

export default Login;
