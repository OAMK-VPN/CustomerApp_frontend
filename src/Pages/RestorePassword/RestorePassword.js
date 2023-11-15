import React, { useState } from "react";
import styles from "./RestorePassword.module.css";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import restore_psw from "../../assets/restore_psw.svg"


export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();




  const getPassword = (e) => {
    e.preventDefault();
    navigate('/login');
  };


  

  return (
    <div className={styles.parent_form}>
      <form className={styles.form} onSubmit={getPassword}>
      <img 
      src = {restore_psw}
      style={{ width: '25%', height: 'auto', paddingTop: "25%", paddingBottom: "10%"}}
      />
      <div>
        <label className={styles.label} htmlFor="email">Email</label><br/>
        <input
          className={styles.input_box}
          id = "email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          />

      </div>
      <button className={styles.restore_button}>Restore</button> <br />
    </form>
    </div>
)}
