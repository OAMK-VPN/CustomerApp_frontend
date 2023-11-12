import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ParcelDetails = () => {
const { userName, parcelID } = useParams();
  console.log(parcelID)
  const [parcel, setParcel] = useState(null);
  const [parcelDetails, setParcelDetails] = useState('');


  useEffect(() => {
    const fetchParcelDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/parcels/${parcelID}`, {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setParcelDetails(data);
        } else {
          console.error('Failed to fetch parcel details:', response.statusText);
        }
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

      <Link to={`/${userName}/ParcelsView`}>Back to parcels overview</Link>
    </div>
  );
};

export default ParcelDetails;