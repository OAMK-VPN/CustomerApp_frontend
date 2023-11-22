import React, { useState } from 'react';
import styles from "./Track.module.css"
import axios from 'axios';
import { debounce } from 'lodash';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcelStatus, setParcelStatus] = useState('');
  const [error, setError] = useState(null);
  const findParcel = debounce(async () => {
    console.log("click");
    try {
      const response = await axios.get( "", 
      { 
        parcel_id: trackingNumber,
      }, 
      {
        headers: 
        {
          'Content-Type': 'application/json',
        },
      })}
      catch (error) {
        setError(true);
      }}, 1000);


      const debouncedFindParcel = (e) => {
        e.preventDefault();
        findParcel();
      }

      const setID = debounce((e) => {
        setTrackingNumber(e.target.value);
        console.log(e.target.value);
      }, 250)



  return (
    <div className={styles.trackingContainer}>
    <form onSubmit={debouncedFindParcel} >
      <div className={styles.trackingForm}>
      <h2 className= {styles.h2t}>Track your parcel</h2>

    <label className={styles.l}>Parcel id</label>
        <div className= {styles.trackingContainer_ch}>
        <input
            className = {styles.input_box} 
            onChange={setID}
            name = "track" 
            type="text"
            placeholder='...'
            required 
        />
        <button className={styles.trackButton}> Find </button>
        </div>
        {!error ? (
            <div>Error </div>
        ) : (
        <div className={styles.details}>
            <div className={styles.parcel_num}><b>Parcel:</b> #34534633</div>
            <div className={styles.parcel_status}><b>Status:</b> delivered</div>
        </div>
        )}
      </div>
      </form>
    </div>
    
  );
};

export default Tracking;

