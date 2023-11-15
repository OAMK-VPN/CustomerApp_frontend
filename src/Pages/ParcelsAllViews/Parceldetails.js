import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";

const ParcelDetails = () => {
  const { parcelID } = useParams();
  console.log(parcelID)
  const [parcel, setParcel] = useState(null);
  const [parcelDetails, setParcelDetails] = useState('');
  const {user} = useAuth();
  const parcel_details_point = `http://localhost:8080/parcels/${parcelID}`

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
  }, [parcelID]);



  
  return (
    <div>
      <h2> Parcel Details </h2>
      <ul>
        <li> Id {parcelDetails.id} </li>
        <li>  Date {parcelDetails.date} </li>
        <li> Parcel name {parcelDetails.parcelName} </li>
        <li> Sender {parcelDetails.senderId} </li>
        <li> Receiver {parcelDetails.receiverId} </li>
        <li> Pickup {parcelDetails.pickupLocation} </li>
        <li> Status {parcelDetails.status} </li>
      </ul>

      <Link to={`/parcels`}>Back to parcels overview</Link>
    </div>
  );
};

export default ParcelDetails;