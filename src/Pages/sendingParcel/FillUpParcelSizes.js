import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FillUpParcelSizes = () => {

    const userName = useParams().userName;
    useEffect(() => {console.log("which user is sending parcel now?"+ userName)});
  
    const [height, setHeight] = useState('');
    const [width,   setWidth] = useState('');
    const [length, setLength] = useState('');
    const [weight, setWeight] = useState('');
    
    const navigate = useNavigate();
 
    const buttonClickHandler = (e) => {
     e.preventDefault();
     navigate(`/${userName}/FillUpRecieverInfo`);                                         
    };


  return (
    <div><h1>    Sending             </h1>

    

    <form onSubmit={buttonClickHandler}>
      <label>
      Height
        <input
          value={height}
          onChange={event => setHeight(event.target.value)}
          name="Height"
          type="text"
        />
      </label>
      <br />
      <label>
      Width
        <input
          value={width}
          onChange={event => setWidth(event.target.value)}
          name="Width"
          type="text"
        />
      </label>
      <br />
      <label>
      Length
        <input
          value={length}
          onChange={event => setLength(event.target.value)}
          name="Length"
          type="text"
        />
      </label>
      <br />
      <label>
      Weight
        <input
          value={weight}
          onChange={event => setWeight(event.target.value)}
          name="Weight"
          type="text"
        />
      </label>
      <br />
      
      <br />
      <button>Next</button> <br />
      {/* <button>Delete Account</button> <br /> */}


    </form>

    </div>
  )
}

export default FillUpParcelSizes;
