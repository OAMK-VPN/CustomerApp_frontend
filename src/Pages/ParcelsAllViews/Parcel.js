import React from "react";
import styles from "./ParcelsView.module.css";
import { useNavigate } from "react-router-dom";

export default function Parcel({ parcelID, date, status, role }) {
  const navigate = useNavigate();
  
  const parcelDetails = () => {
  navigate(`/parcels/${parcelID}`, {state: {role: role}});
}
  return (
      <tr onClick = {parcelDetails} className = {styles.tableRow}>
        <td className = {styles.tableC}> {parcelID} </td> 
        <td className = {styles.tableC}> {date.slice(0,10)} </td> 
        <td className = {styles.tableC}> {status.toLowerCase().replace(/_/g, ' ')} </td>
      </tr>
  );
}