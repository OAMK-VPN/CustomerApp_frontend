import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { usersAPI } from "../../Instance";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import login_lock from "../../assets/login_lock.svg"
import styles from "./Login.module.css";



import { debounce } from "lodash";
const Login = () => {

  const login_point = import.meta.env.VITE_APP_LOGIN_API;
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
  const resetForm = () => {
    setEmail('');
    setPassword('');
  }



  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(loginForm);
    try {
      const response = await usersAPI.put( '/signIn', 
      { 
        email: loginForm.email, 
        password: loginForm.password,
      });


        localStorage.setItem("token", response.data.token);
        if (!response.data.active) {
          const reactivate = confirm("Your account has been deactivated, would you like to reactive it?")
          if (reactivate) {
            try {
            await usersAPI.put("/authUser/reactive");
            }
            catch (error) {
              return;
            }
          }
          else {
            navigate('/');
            return;
          }
        }
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
  }, 50)



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