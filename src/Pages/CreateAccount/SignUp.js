import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import logo from "../../assets/logo_b.png"

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();



    const InputSanitazier_city = (e) => {
      let sanitaziedInput = e.target.value.replace(/[^A-Za-z]/g, '');
      setCity(sanitaziedInput);
    }

    const InputSanitazier_name = (e) => {
      let sanitaziedInput = e.target.value.replace(/[^A-Za-z]/g, '');
      setName(sanitaziedInput);
    }



    const submitHandler = (e) => {
        e.preventDefault();
        alert('You have successfully created your account. Please login.');
        navigate('/login');
    }

    return (
        <div className={styles.parent_form}>
          <form className={styles.form} onSubmit={submitHandler}>
            <img 
              src = {logo}
              style={{ width: '25%', height: 'auto', paddingTop: "15%", paddingBottom: "10%"}}
            />

            {/* Email */}
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              className={styles.input_box}
              id = "email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              name="email"
              type="email"
            />


            {/* Full name */}
            <label className={styles.label} htmlFor="name">Full name</label>
            <input
              className={styles.input_box}
              id = "name"
              value={name}
              onChange={InputSanitazier_name}
              name="name"
              type="text"
            />


            {/* City */}
            <label className={styles.label} htmlFor="City">City</label>
            <input
              className={styles.input_box}
              id = "city"
              value={city}
              onChange={InputSanitazier_city}
              name="city"
              type="text"
            />


            {/* Password */}
            <label className={styles.label} htmlFor="postalCode">Postal Code</label>
            <input
              className={styles.input_box}
              id = "postalCode"
              value={postalCode}
              onChange={event => setPostalCode(event.target.value)}
              name="postalCode"
              type="number"
            />


            {/* Password */}
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              className={styles.input_box}
              id = "password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              name="password"
              type="password"
            />

        <button className={styles.create_button}>Create</button>
        <Link to={`/login`} className={styles.account_already}>Already have an account?</Link>
        </form>
    </div>
    )
}

export default SignUp