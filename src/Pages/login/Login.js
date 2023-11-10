import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

import { getAllCredentials } from "../../userCredentials";
import { useNavigate } from 'react-router-dom';
import login_lock from "../../assets/login_lock.svg"
import { useAuth } from "../../AuthContext";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);

  
  const navigate = useNavigate();
  const UserInputHandler = (e) => {
    const sanitaziedInput = e.target.value.replace(/[^A-Za-z0-9@.]/g, '');
    setEmail(sanitaziedInput);
  }
  const { state,dispatch } = useAuth();



  // token check (user logged in before)
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
  
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/validate-token', {
            method: 'GET',
            headers: {
              authorization: token,
            },
          });
  
          if (response.ok) {
            const data = await response.text();
            const username = data;
            dispatch({
              type: 'LOGIN',
              payload: {
                user: { username },
              },
            });
            navigate(`/${username}/ParcelsView`);
          } else {
            navigate('/login');
            alert("wrong token")
          }
        } catch (error) {
          console.error('Error during token validation:', error);
        }
      }
    };
  
    checkTokenValidity();
  }, [dispatch, navigate]);





  // login
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });


      if (!response.ok) {
        throw new Error("Error") }

      const responseData = await response.json();
      setResponse(responseData);
      const { username, token } = responseData;

      localStorage.setItem('token', token);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: { username },
        },
      });

      navigate(`/${username}/ParcelsView`);
      } catch (error) {
        setError('Invalid email or password. Please try again.');
        alert(error);
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
