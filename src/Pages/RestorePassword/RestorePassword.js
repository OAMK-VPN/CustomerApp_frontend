import React, { useState } from "react";
import { Link } from "react-router-dom";

import { getAllCredentials } from "../../userCredentials";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const credentials = getAllCredentials();

  const printCredentials = () => { console.log(credentials); };



  const getPassword = (e) => {
    e.preventDefault();
    printCredentials();
    let isUserFound = false; 
    let password ='';

    credentials.forEach((credential) => {
      if (email === credential.email ) {
        isUserFound = true; password = credential.password;
      }
    });

    if (isUserFound) {
      alert('Your Email: '+ email +' and your Password: '+password);
    } else {
      alert('No such an user was found. Please try again.');
    }
  };


  

  return (
    <div className>
    <h1>Restore Password</h1>
    <form onSubmit={getPassword}>
      <label>
        Email:
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          name="email"
          type="text"
        />
      </label>
      <br />
      <button>Restore</button> <br />
    </form>
    </div>
  );
}
