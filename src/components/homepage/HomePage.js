import React, { useState } from 'react'
import { Routes, Route, Link} from "react-router-dom";
import '../homepage/HomePage.css'
import Login from "../login/Login"
import SignUp from "../signup/SignUp"
import Header from '../header/Header'
import ParcelFinder from '../parcel-finder/ParcelFinder'

import sendAParcel from '../../assets/sendAParcel.png'
import sendAForm from '../../assets/sendAForm.png'
import applyJob from '../../assets/apply.png'


const HomePage = () => {
  const [currentForm, setCurrentForm] = useState('');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="container">
      <Header />
      <main>
        <ParcelFinder/>
        <div className="content">
          <img src={sendAParcel} alt="How to send a parcel?" />
          <button text="Send a parcel" href="/send-parcel">
            Send a parcel
          </button>
        </div>
        <div className="content">
          <img src={sendAForm} alt="Not sure about the price?" />
          <button text="Send a form" href="/send-form">
            Send a form
          </button>
        </div>
        <div className="content">
          <img src={applyJob} alt="We're hiring" />
          <button text="Apply" href="/send-application">
            Apply
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;