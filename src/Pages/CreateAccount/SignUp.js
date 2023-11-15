import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import new_account from "../../assets/new_account.svg"

const SignUp = (props) => {

    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    const signup_point = process.env.REACT_APP_SIGNUP_API

    const [form, setForm] = useState({
      email: '',
      name: '',
      city: '',
      address: '',
      postalCode: '',
      password: '',
    })

    const handleForm = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    }

    const checkPasswordlen = () => {
      setValid(form.password.length >= 12);
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        if (!form.email || !form.name || !form.city || !form.address || !form.postalCode || !form.password || !valid) {
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
              email: form.email,
              fullname: form.name,
              city: form.city,
              address: form.address,
              zipcode: form.postalCode,
              password: form.password,
            }),
          });
          console.log(form,usrnm);
      
          if (response.ok) {
            alert(`Your username: ${usrnm}`);
            return navigate('/');
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
                onChange={handleForm}
                value={form.email}
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
                onChange={handleForm}
                value={form.name}
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
                onChange={handleForm}
                value={form.city}
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
                onChange={handleForm}
                value={form.address}
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
                onChange={handleForm}
                value={form.postalCode}
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
                name="password"
                type="password"
                value={form.password}
                onChange={e => {
                  handleForm(e);
                  checkPasswordlen();
                }}
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