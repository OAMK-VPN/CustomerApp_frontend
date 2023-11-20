import React, { useState } from "react";
import styles from "./RestorePassword.module.css";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
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
    } catch (error) { }

    toast.success("A new password has been sent to your email", {
      duration: 1200,
      style: {
        color: '#163760',
      },
      iconTheme: {
        primary: '#163760',
      }
    });

    setTimeout(() => {
      navigate('/login')
    }, 1500);
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
          onChange={event => setEmail(event.target.value)}
          name="email"
          type="email"
          required
          />

      </div>
      <button className={styles.restore_button} type="submit">Restore</button> <br />
    </form>
    <Toaster/>
    </div>
)}
