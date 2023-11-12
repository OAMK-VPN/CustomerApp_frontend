import React, {useEffect, useState} from "react";
import {useParams,Link, redirect} from "react-router-dom";
import styles from "./ParcelsView.module.css";
import Parcel from "./Parcel";
import ParcelDetails from "./Parceldetails";
import { useAuth } from "../../AuthContext";
import { useNavigate, Redirect } from 'react-router-dom';

const ParcelsView = () => {
  const {user, logout} = useAuth();
  const [parcels, setParcels] = useState([]);

  const navigate = useNavigate();
  const userName = user.username;

  const handleLogout = () => {
    logout();
    return navigate('/');
  }


  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await fetch(`http://localhost:8080/parcels`, {
          method: 'GET',
          headers: {
            Authorization: `${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setParcels(data.userParcels);
          // userName = data.username; // 
        } else {
          console.error('Failed to fetch parcels:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
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
            <Link to={`/${userName}/FillUpParcelSizes`}>Send</Link> <br/>
            <Link to="/history">History  </Link> <br/>
            <Link to="/track">Track  </Link> <br/>
            <button onClick = {handleLogout}>Logout </button> <br/>
            <Link to={`/${userName}/Settings`}> Settings  </Link> 
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