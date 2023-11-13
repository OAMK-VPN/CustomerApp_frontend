import React, { useState } from 'react'
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import styles from './HomePage.module.css'
import logo from "../../assets/test_logo.svg"
import { useAuth } from '../../AuthContext';

const HomePage = () => {
  const [currentForm, setCurrentForm] = useState('');
  const { user }  = useAuth();
  const navigate = useNavigate();
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleMyPost = () => {
    navigate('login'); // simple way, can be rewritten with the same logic as in login.js
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
  
        <div class = {styles.parent_mainText}>
          <div class = {styles.mainText}>
            <p><span class = {styles.trackWord}>Track</span></p>
            <p><span class = {styles.andWord}>and</span></p>
            <p><span class = {styles.traceWord}>Trace</span></p>
          </div>


          <div className = {styles.searchBox}>
            <input type="text" placeholder="Parcel id" className = {styles.searchinput}/>
            <button>Find</button>
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