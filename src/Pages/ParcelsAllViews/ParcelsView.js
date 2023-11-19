import React, {useEffect, useState} from "react";
import {useParams,Link, redirect} from "react-router-dom";
import styles from "./ParcelsView.module.css";
import Parcel from "./Parcel";
import ParcelDetails from "./Parceldetails";
import { useAuth } from "../../AuthContext";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/test_logo.svg"

import api from "../../Instance";


const ParcelsView = () => {
  const {user, logout} = useAuth();
  const [parcels, setParcels] = useState([]);
  const parcels_all_point = '/parcels'
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    return navigate('/');
  }


  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await api.get(parcels_all_point);
      setParcels(response.data.userParcels);
      } catch (error) {
        console.error('Error during fetch:', error);
        console.log('test');
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
          <img 
              src = {logo}
              style={{ width: '8%', height: 'auto', maxWidth: '45px', padding: '1.5vh'}}
          />
          <nav className= {styles.testnav}>
            <Link to={`/send`}  className = {styles.myparcels_link}> Send parcel </Link> 
            <details className = {styles.myparcels_dropdown}>
              <summary>
                <Link to="/parcels"  className = {styles.myparcels_link} >Parcels </Link>
              </summary>
              <div className = {styles.myparcels_dropdown_ch}>
              <Link to="/parcels" className = {styles.myparcels_link}>All  </Link><br/>
              <Link to="/parcels" className = {styles.myparcels_link}>Sent  </Link><br/>
              <Link to="/parcels" className = {styles.myparcels_link}>Received  </Link>
              </div>
            </details>
            <Link to="/track" className = {styles.myparcels_link}> Track  </Link>
            {/*<button onClick = {handleLogout}>Logout </button> */}
            <Link to={`/`}  className = {styles.myparcels_link}> Logout  </Link> 
            <Link to={`/Settings`}  className = {styles.myparcels_link}> Settings  </Link> 
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