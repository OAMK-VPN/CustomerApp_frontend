import React, { useState } from "react";
import styles from "./RestorePassword.module.css";
import { Link } from "react-router-dom";
import { getAllCredentials } from "../../userCredentials";
import { useNavigate } from 'react-router-dom';
import restore_psw from "../../assets/restore_psw.svg"


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const credentials = getAllCredentials();

  const printCredentials = () => { console.log(credentials); };



  const getPassword = (e) => {
    e.preventDefault();
    printCredentials();
    let isUserFound = false; 
    let password ='';

    credentials.forEach((credential) => {
      if (email === credential.email ) {
        isUserFound = true; password = credential.password;
      }
    });

    if (isUserFound) {
      alert('Your Email: '+ email +' and your Password: '+ password);
    } else {
      alert('No such an user was found. Please try again.');
    }
    navigate('/login');
  };


  

  return (
    <div className={styles.parent_form}>
      <form className={styles.form} onSubmit={getPassword}>
      <img 
      src = {restore_psw}
      style={{ width: '25%', height: 'auto', paddingTop: "25%", paddingBottom: "10%"}}
      />
        <label className={styles.label} htmlFor="email">Email</label>
        <input

          className={styles.input_box}
          id = "email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          />
      
      <button className={styles.restore_button}>Restore</button> <br />
    </form>
    </div>
)}
