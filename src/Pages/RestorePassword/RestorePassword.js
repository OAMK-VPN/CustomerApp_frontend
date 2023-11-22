import React, { useState } from "react";
import styles from "./RestorePassword.module.css";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import restore_psw from "../../assets/restore_psw.svg"
import axios from "axios";
import api from "../../Instance";
import { debounce } from "lodash";

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const notification_toast = (type, message, interval) =>
  toast[type](
    message, 
  { duration: interval,
    style: { color: '#163760', },
    iconTheme: { primary: '#163760', }
  });



  const restorePassword = async (e) => {
    e.preventDefault()

    try {
      const enc_email = encodeURIComponent(email);
      await axios.put(`http://localhost:8080/api/users/forgotPassword/${enc_email}`)
    } catch (error) { }

    notification_toast("success", "A new password has been sent to your email", 1200)
    setTimeout(() => {
      navigate('/login')
    }, 1500);
  }

  const handleChange = debounce((e) => {
    console.log(1);
    setEmail(e.target.value);
  }, 250)
  

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
          onChange={handleChange}
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
