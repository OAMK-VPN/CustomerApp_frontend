import React, { useState } from "react";
import styles from "./RestorePassword.module.css";
import { useNavigate } from 'react-router-dom';
import restore_psw from "../../assets/restore_psw.svg"
import axios from "axios";
import api from "../../Instance";

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();




  const restorePassword = async (e) => {
    e.preventDefault()

    try {
      const enc_email = encodeURIComponent(email);
      await axios.put(`http://localhost:8080/api/users/forgotPassword/${enc_email}`)
    } catch (error) {
      
    }
    alert('A new password is on its way as soon as we locate your email')
    navigate('/login')
  }

  

  return (
    <div className={styles.parent_form}>
      <form className={styles.form} onSubmit={restorePassword}>
      <img 
      src = {restore_psw}
      style={{ width: '25%', height: 'auto', paddingTop: "25%", paddingBottom: "10%"}}
      alt = "Restore password"
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
