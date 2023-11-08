import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import new_account from "../../assets/new_account.svg"

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
              src = {new_account}
              style={{ width: '25%', height: 'auto', paddingTop: "8%", paddingBottom: "10%"}}
            />

            {/* Email */}
            <div className= {styles.input_boxp}>
              <label className={styles.label} htmlFor="email">Email</label><br/>
              <input
                className={styles.input_box}
                id = "email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                name="email"
                type="email"
              />
            </div>


            {/* Full name */}
            <div className= {styles.input_boxp}>
              <label className={styles.label} htmlFor="name">Full name</label><br/>
              <input
                className={styles.input_box}
                id = "name"
                value={name}
                onChange={InputSanitazier_name}
                name="name"
                type="text"
              />
            </div>

            {/* City */}
            <div className= {styles.input_boxp}>
              <label className={styles.label} htmlFor="City">City</label><br/>
              <input
                className={styles.input_box}
                id = "city"
                value={city}
                onChange={InputSanitazier_city}
                name="city"
                type="text"
              />
            </div>

            {/* Password */}
            <div className= {styles.input_boxp}>
              <label className={styles.label} htmlFor="postalCode">Postal Code</label><br/>
              <input
                className={styles.input_box}
                id = "postalCode"
                value={postalCode}
                onChange={event => setPostalCode(event.target.value)}
                name="postalCode"
                type="number"
              />
            </div>

            {/* Password */}
            <div className= {styles.input_boxp}>
              <label className={styles.label} htmlFor="password">Password</label><br/>
              <input
                className={styles.input_box}
                id = "password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                name="password"
                type="password"
              />
            </div>

        <button className={styles.create_button}>Create</button>
        <Link to={`/login`} className={styles.account_already}>Already have an account?</Link>
        </form>
    </div>
    )
}

export default SignUp