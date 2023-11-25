import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import logo from "../../assets/test_logo.svg"
import styles from "./Parceldetails.module.css";
import { parcelsAPI } from "../../Instance";
const ParcelDetails = () => {
  const { parcelID } = useParams();
  const [parcelDetails, setParcelDetails] = useState('');
  const {user} = useAuth();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const role = state && state.role;
  const parcel_details_point = `/parcel/${parcelID}/role/${role}`

  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchParcelDetails = async () => {
      try {
        const response = await parcelsAPI.get(parcel_details_point)
        setParcelDetails(response.data);
        console.log(response.data);
      } catch (error) {
          console.error('Error during fetch:', error);
          navigate('/parcels');
      } 
        finally {
          setLoading(false);
      }
    } 
      fetchParcelDetails();
  }, [parcelID, parcel_details_point, user.token]);

  if (loading) {
    return <></>
  }


  
  return (
    <div>    
    <Link to = '/'>
      <img 
        src = {logo}
        style={{ width: '8%', height: 'auto', maxWidth: '45px', padding: '1.5vh'}}
        alt = "?"
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
          <li> <b>Sender:</b> {parcelDetails.sender.fullname} </li>
          <li> <b>Receiver:</b> {parcelDetails.receiver.fullname} </li>
          <li> <b>Sent from: </b> {parcelDetails.sender.city.toLowerCase()} </li>
          <li> <b>Pickup: </b> {parcelDetails.receiver.city.toLowerCase()} </li>
        </ul>
        
        <ul>
          <li> <b>Status:</b> {parcelDetails.status.toLowerCase().replace(/_/g, ' ')} </li>
          <li> <b>Ready to pickup:</b>  </li>
          <li> <b>Picked up:</b>  </li>
          <li> <b>Code:</b> {parcelDetails.cabinet.code} </li>
          <li> <b>Cabinet number:</b> {parcelDetails.cabinet.number} </li>
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ParcelDetails;