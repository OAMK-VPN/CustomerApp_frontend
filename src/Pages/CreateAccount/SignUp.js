import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
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
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    const signup_point = process.env.REACT_APP_SIGNUP_API


    const InputSanitazier_city = (e) => {
      let sanitaziedInput = e.target.value.replace(/[^A-Za-z]/g, '');
      setCity(sanitaziedInput);
    }

    const InputSanitazier_name = (e) => {
      let sanitaziedInput = e.target.value.replace(/[^A-Za-z ]/g, '');
      setName(sanitaziedInput);
    }

    const checkPasswordlen = () => {
      setValid(password.length >= 12);
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email || !name || !city || !address || !postalCode || !password || !valid) {
          toast.error("Please fill all the details", {
            duration: 1000,
            style: {
              color: '#163760',
            },
            iconTheme: {
              primary: '#163760',
            }
          });
          return 
        }


        let usrnm = Math.random().toString(24).slice(2,12); // username gen

        try {
          const response = await fetch(signup_point, {
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
            //alert(`This user already exists`);
          }
        } catch (error) {
          toast.error("Error", {
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
          <form className={styles.form} onSubmit={submitHandler}>
            <img 
              src = {new_account}
              style={{ width: '25%', height: 'auto', paddingTop: "8%", paddingBottom: "8%"}}
              alt = 'Create an account'
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
              <label className={styles.label} htmlFor="password">Password {'(>12 )'}</label><br/>
              <input
                className={valid ? styles.input_box : styles.input_box_inv}
                id = "password"
                value={password}
                onChange={event => {
                  setPassword(event.target.value);
                  checkPasswordlen();
                }}
                name="password"
                type="password"
              />
            </div>

        <button className={styles.create_button} onClick={submitHandler}>Create</button>
        <Link to={`/login`} className={styles.account_already}>Already have an account?</Link>
        </form>
        <Toaster />
    </div>
    )
}

export default SignUp