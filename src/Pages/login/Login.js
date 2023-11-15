import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import login_lock from "../../assets/login_lock.svg"
import { useAuth } from "../../AuthContext";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login_point = process.env.REACT_APP_LOGIN_API;

  
  const navigate = useNavigate();
  const UserInputHandler = (e) => {
    const sanitaziedInput = e.target.value.replace(/[^A-Za-z0-9@.]/g, '');
    setEmail(sanitaziedInput);
  }
  const { user, login } = useAuth();


  // already logged in
  {/* useEffect(() => {
    const validateToken = async () => {
      try {
        if (localStorage.getItem("token") !== null) {
          const response = await fetch(`http://localhost:8080/validate-token`, {
            method: "GET",
            headers: {
              Authorization: `${user.token}`,
            },
          });
          console.log("good")
          if (response.ok) {
            const responseData = await response.json();
            login({ username: responseData.username, token: responseData.token });
            navigate(`/${responseData.username}/ParcelsView`);
          } else {
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    validateToken();
  }, [user.token, navigate, login]); */}


  // yet to login
  // http://localhost:8080/api/users/signIn
  // useEffect?? (probably not)
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( login_point, 
      { 
        email: email,       // will be replaced with email username: email,
        password: password,
      }, 
      {
        headers: 
        {
          'Content-Type': 'application/json',
        },
      });

        login({username: response.data.username, token: response.data.token});
        console.log("good");
        toast.success("Success", {
          duration: 750,
          style: {
            color: '#163760',
          },
          iconTheme: {
            primary: '#163760',
          }
        });
        setTimeout(() => {
          navigate(`/parcels`);
        }, 750)


      } catch (error) {
        toast.error("Authentication error", {
          duration: 1000,
          style: {
            color: '#163760',
          },
          iconTheme: {
            primary: '#163760',
          }
        });
      }
  };





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
          id = "email"
          value={email}
          onChange={UserInputHandler}
          name="email"
          type="text"
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
      <Link to={`/signup`} className={styles.create_account}>Create Account</Link>
    
      </form>
      <Toaster/>
    </div>
  );
};

export default Login;
