import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import logo from "../../assets/test_logo.svg"
import axios from "axios";
import styles from "./Parceldetails.module.css";
const ParcelDetails = () => {
  const { parcelID } = useParams();
  const [parcelDetails, setParcelDetails] = useState('');
  const {user} = useAuth();
  const parcel_details_point = `http://localhost:8080/parcels/${parcelID}`
  const navigate = useNavigate();
  useEffect(() => {
    const fetchParcelDetails = async () => {
      try {
        const response = await axios.get(parcel_details_point, {
          headers: {
            Authorization: user.token, // bearer
          },
        });
        
        setParcelDetails(response.data);
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchParcelDetails();
  }, [parcelID, parcel_details_point, user.token]);



  
  return (
    <div>    
    <Link to = '/'>
      <img 
        src = {logo}
        style={{ width: '8%', height: 'auto', maxWidth: '45px', padding: '1.5vh'}}
      />
    </Link>  
    
    <div className={styles.parent_div}>
    <div className = {styles.parcel_details_container}>
      <div className = {styles.back_div}>
        <button onClick={() => {navigate('/parcels')}} className={styles.back_button}>
          {'<'}
        </button>
      </div>
      <div className = {styles.details}>
        <ul>
          <li> <b>Id:</b> {parcelDetails.id} </li>
          <li> <b>Sender:</b> {parcelDetails.senderId} </li>
          <li> <b>Receiver:</b> {parcelDetails.receiverId} </li>
          <li> <b>Sent from: </b> {parcelDetails.location} </li>
          <li> <b>Pickup: </b> Test location 2 </li>
        </ul>
        
        <ul>
          <li> <b>Status:</b> {parcelDetails.status} </li>
          <li> <b>Ready to pickup:</b> 17.10.23 16:00 </li>
          <li> <b>Picked up:</b> 18.10.23 17:32 </li>
          <li> <b>Code:</b> 0200 </li>
          <li> <b>Cabinet number:</b> 10 </li>
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ParcelDetails;