import React from "react";
import styles from "./Parcel.module.css";
import { Link } from "react-router-dom";

/* This component is used to display a single parcel in the parcels view. */

export default function Parcel({ userName, parcelID, date, recipientAddress, status }) {
  return (
    <tr className={styles} data-testid={`parcel-${parcelID}`}>
      
      
      
      <td> <Link to={`/${userName}/parcels/${parcelID}`}> {parcelID}</Link> </td> <td> {date} </td> <td> {recipientAddress} </td> <td> {status} </td> 
      
      
     
    </tr>
  );
}
