import React, {useEffect, useState} from "react";
import {useParams,Link, redirect} from "react-router-dom";
import styles from "./ParcelsView.module.css";
import Parcel from "./Parcel";
import ParcelDetails from "./Parceldetails";
import { useAuth } from "../../AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ParcelsView = () => {
  const {user, logout} = useAuth();
  const [parcels, setParcels] = useState([]);
  const parcels_all_point = process.env.REACT_APP_ALL_PARCELS_API;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    return navigate('/');
  }


  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get(parcels_all_point, {
          headers: {
            Authorization: `${user.token}`,
          },
        });

          setParcels(response.data.userParcels);
      } catch (error) {
        console.error('Error during fetch:', error);
        navigate('/login')
      }
    };

    if (user && user.token) {
      fetchParcels();
    } else if (user === '') {
      navigate("/login");
    }
  }, [user, user.token, navigate]);





     
  return (
    <div>
          <h1>Posti</h1>
          <nav className= {styles.testnav}>
            <Link to={`/FillUpParcelSizes`}>Send</Link> <br/>
            <Link to="/history">History  </Link> <br/>
            <Link to="/track">Track  </Link> <br/>
            <button onClick = {handleLogout}>Logout </button> <br/>
            <Link to={`/Settings`}> Settings  </Link> 
          </nav>

          <div className={styles.divP}>
          <div className = {styles.divpTable}>
            <table className = {styles.pTable}>
              <thead>
              <th className = {styles.pth} > Parcel ID </th>
              <th className = {styles.pth} > Date </th>
              <th className = {styles.pth} > Status </th>
             </thead>
              <tbody>
                {parcels.map((parcel) => (
                  <Parcel
                    parcelID={parcel.id}
                    date={parcel.date}
                    status={parcel.status}
                    userName={parcel.sendername}
                    key={parcel.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
          </div>
    </div>
  );
};

export default ParcelsView;