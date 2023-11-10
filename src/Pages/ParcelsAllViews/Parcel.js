import React from "react";
import styles from "./Parcel.module.css";
import { Link } from "react-router-dom";


export default function Parcel({ parcelID, date, status,userName }) {
  return (
    <tr className={styles} data-testid={`parcel-${parcelID}`}>
      <td> <Link to={`/${userName}/parcels/${parcelID}`}> {parcelID}</Link> </td> <td> {date} </td> <td> {status} </td> 
      
      
     
    </tr>
  );
}