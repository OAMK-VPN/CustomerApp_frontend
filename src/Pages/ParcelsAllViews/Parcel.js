import React from "react";
import styles from "./ParcelsView.module.css";
import { useNavigate } from "react-router-dom";

export default function Parcel({ parcelID, date, status,userName }) {
  const navigate = useNavigate();
  
  const parcelDetails = () => {
  navigate(`/${userName}/parcels/${parcelID}`);
}
  return (
      <tr onClick = {parcelDetails} className = {styles.tableRow}>
        <td className = {styles.tableC}>  {parcelID} </td> 
        <td className = {styles.tableC}>  {date} </td> 
        <td className = {styles.tableC}> {status} </td>
      </tr>
  );
}