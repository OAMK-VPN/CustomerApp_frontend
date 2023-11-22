import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { debounce } from "lodash";


import styles from "./SignUp.module.css";
import new_account from "../../assets/new_account.svg"
import InputField from "./SignUp_input";
const SignUp = (props) => {

    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    const signup_point = process.env.REACT_APP_SIGNUP_API
    
    const notification_toast = (type, message, interval) =>
    toast[type](
      message, 
    { duration: interval,
      style: { color: '#163760', },
      iconTheme: { primary: '#163760', }
    });

    const [form, setForm] = useState({
      email: '',
      name: '',
      city: '',
      address: '',
      postalCode: '',
      password: '',
    })



    const handleForm = debounce((e) => {
      console.log(form)
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    }, 300)


    const submitHandler = async (e) => {
        e.preventDefault();
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
          else {
            throw new Error();
          }
        } catch (error) {
          notification_toast("error", "Error", 1000);
        }
      };

    return (
        <div className={styles.parent_form}>
          <form className={styles.form} onSubmit={submitHandler}>
            <img 
              src = {new_account}
              style={{ width: '20%', height: 'auto', paddingTop: "8%", paddingBottom: "8%"}}
              alt = 'Create an account'
            />

            {/* Email */}
            <InputField
              autoFocus
              label = "Email"
              id = "email"
              onChange={handleForm}
              name="email"
              type="email"
              required
            />


            {/* Full name */}
            <InputField
              label = "Full name"
              id = "name"
              onChange={handleForm}
              name="name"
              type="text"
              pattern="^[a-zA-Z]+(\s[a-zA-Z]+)+$"
              required
            />
            

            {/* City */}
            <InputField
              label = "City"
              id = "city"
              onChange={handleForm}
              name="city"
              type="text"
              pattern="[A-Za-z]+"
              required
            />


            {/* Address */}
            <InputField
              label = "Address"
              id = "address"
              onChange={handleForm}
              name="address"
              type="text"
              required
            />

            {/* Postal code */}
            <InputField
              label = "Postal code"
              id = "postalCode"
              onChange={handleForm}
              name="postalCode"
              type="text"
              pattern="\d{5}"
              required
            />

            {/* Password */}
            <InputField
              label = "Password (>10) "
              id = "password"
              onChange={handleForm}
              name="password"
              type="password"
              pattern="^(?=.*\d).{10,}$"
              title="password must contain at least 1 number"
              required
            />

        <button className={styles.create_button} type="submit">Create</button>
        <Link to={`/login`} className={styles.account_already}>Already have an account?</Link>
        </form>
        <Toaster />
    </div>
    )
}

export default SignUp