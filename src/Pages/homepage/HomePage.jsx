import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import styles from './HomePage.module.css'
import logo from "../../assets/test_logo.svg"



const HomePage = () => {
  const [currentForm, setCurrentForm] = useState('');

  const navigate = useNavigate();
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleMyPost = () => {
    navigate('login');
  }

  const handleTracking = () => {
    navigate('track');
  }


  return (
      <div className = {styles.parent_container}>
        <div className = {styles.footer}>
          <img 
              src = {logo}
              style={{ width: '8%', height: 'auto', maxWidth: '45px'}}
          />
          <Link to = "login" className= {styles.loginLink}> Login </Link>
        </div>

        <div className = {styles.parent_mainText}>
          <div className = {styles.mainText}>
            <p><span className = {styles.trackWord}>Track</span></p>
            <p><span className = {styles.andWord}>and</span></p>
            <p><span className = {styles.traceWord}>Trace</span></p>
          </div>


          <div className = {styles.searchBox}>
            <input type="text" placeholder="Parcel id" className = {styles.searchinput} onClick={handleTracking}/>
            <button onClick={handleTracking}>Find</button>
          </div>
        </div>


        <div className= {styles.buttons_container}>
          <button className= {styles.bottom_button}>
            <span>Send parcel</span>
          </button>

          <button className= {styles.bottom_button} onClick={handleMyPost}>
            <span>My post</span>
          </button>

          <button className= {styles.bottom_button}>
            <span>Pickup</span>
          </button>
        </div>
      </div>
    );
};

export default HomePage;