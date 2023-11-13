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
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();



    const InputSanitazier_city = (e) => {
      let sanitaziedInput = e.target.value.replace(/[^A-Za-z]/g, '');
      setCity(sanitaziedInput);
    }

    const InputSanitazier_name = (e) => {
      let sanitaziedInput = e.target.value.replace(/[^A-Za-z ]/g, '');
      setName(sanitaziedInput);
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        let usrnm = Math.random().toString(24).substring(2,12);
        try {
          const response = await fetch('http://localhost:8080/api/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: usrnm,
              email: email,
              fullname: name,
              city: city,
              address: address,
              zipcode: postalCode,
              password: password,
            }),
          });
      
          if (response.ok) {
            alert(`Your username: ${usrnm}`);
            navigate('/');
          } else {
            alert(`This user already exists`);
          }
        } catch (error) {
          alert('error');
        }
      };

    return (
        <div className={styles.parent_form}>
          <form className={styles.form} onSubmit={submitHandler}>
            <img 
              src = {new_account}
              style={{ width: '25%', height: 'auto', paddingTop: "8%", paddingBottom: "8%"}}
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

            {/* Address */}
            <div className= {styles.input_boxp}>
              <label className={styles.label} htmlFor="Address">Address</label><br/>
              <input
                className={styles.input_box}
                id = "address"
                value={address}
                onChange={event => setAddress(event.target.value)}
                name="address"
                type="text"
              />
            </div>

            {/* Postal code */}
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