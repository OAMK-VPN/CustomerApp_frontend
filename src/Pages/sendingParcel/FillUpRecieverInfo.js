import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

 const FillUpRecieverInfo = () => {

    const userName = useParams().userName;
    useEffect(() => {console.log("which user is sending parcel now?"+ userName)});
  
    const [firstName, setFirstName] = useState('');
    const [lastname,   setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    
    const navigate = useNavigate();
 
    const buttonClickHandler = (e) => {
     e.preventDefault();
     navigate(`/${userName}/SystemGeneratedCode`);                                      
    };


  return (
    <div><h1>    Sending             </h1>

    

    <form onSubmit={buttonClickHandler}>
      <label>
       FirstName
        <input
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
          name="FirstName"
          type="text"
        />
      </label>
      <br />
      <label>
      Lastname
        <input
          value={lastname}
          onChange={event => setLastname(event.target.value)}
          name="Lastname"
          type="text"
        />
      </label>
      <br />
      <label>
      Address
        <input
          value={address}
          onChange={event => setAddress(event.target.value)}
          name="Address"
          type="text"
        />
      </label>
      <br />
      <label>
      EmailAddress
        <input
          value={emailAddress}
          onChange={event => setEmailAddress(event.target.value)}
          name="EmailAddress"
          type="text"
        />
      </label>
      <br />
      
      <br />
      <button>Next</button> <br />



    </form>

    </div>
  )
}
export default FillUpRecieverInfo;