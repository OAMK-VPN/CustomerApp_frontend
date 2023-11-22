import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import login_lock from "../../assets/login_lock.svg"
import { useAuth } from "../../AuthContext";
import { debounce } from "lodash";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login_point = process.env.REACT_APP_LOGIN_API;
  const notification_toast = (type, message, interval) =>
  toast[type](
    message, 
  { duration: interval,
    style: { color: '#163760', },
    iconTheme: { primary: '#163760', }
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })

  
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const resetForm = () => {
    setEmail('');
    setPassword('');
  }



  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(loginForm);
    try {
      const response = await axios.post( login_point, 
      { 
        email: loginForm.email,       // will be replaced with email username: email,
        password: loginForm.password,
      }, 
      {
        headers: 
        {
          'Content-Type': 'application/json',
        },
      });

        login({username: response.data.username, token: response.data.token});
        notification_toast('success', 'Success', 750);
        setTimeout(() => {
          navigate(`/parcels`);
        }, 750)


      } catch (error) {
        notification_toast('error', 'Authentication error', 750);
      }
  };


  const handleChange = debounce((e) => {
    console.log(loginForm);
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    })
  }, 300)



  return (
    <div className={styles.parent_form}>
      <form className={styles.form} onSubmit={loginHandler}>
      <img 
      src = {login_lock}
      style={{ width: '25%', height: 'auto', paddingTop: "25%", paddingBottom: "10%"}}
      alt = 'Login'
      />
      <div>
        <label className={styles.label} htmlFor="email">Email</label><br/>
        <input
          className={styles.login_input}
          autoFocus
          id = "email"
          onChange={handleChange}
          name="email"
          type="email"
          required
          />
      </div>

      <div>
        <label className={styles.label} htmlFor="password">Password</label><br/>
        <input
          className={styles.login_input}
          id = "password"
          onChange={handleChange}
          name="password"
          type="password"
          required
        />
      </div>
      
      <button className={styles.login_button} type="submit">Login</button> <br />
      <Link to={`/RestorePassword`} className={styles.restore_password}>Restore Password</Link> <br />
      <Link to={`/signup`} className={styles.create_account}>Create Account</Link>
    
      </form>
      <Toaster/>
    </div>
  );
};

export default Login;
