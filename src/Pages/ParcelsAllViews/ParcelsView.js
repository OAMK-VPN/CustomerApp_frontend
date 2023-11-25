import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styles from "./ParcelsView.module.css";
import Parcel from "./Parcel";

import { useAuth } from "../../AuthContext";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/test_logo.svg"
import { parcelsAPI } from "../../Instance";



const ParcelsView = () => {
  const {user} = useAuth();
  const [received_parcels, setReceived_parcels] = useState([]);
  const [sent_parcels, setSent_parcels] = useState([]);
  const [all_parcels, setAll_parcels] = useState([]);
  const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const received_parcels_raw = await parcelsAPI.get('/receiver');
        const sent_parcels_raw = await parcelsAPI.get('/sender');
        

        const received_parcels = received_parcels_raw.data.map(i => ({...i, role: "RECEIVER"}));
        const sent_parcels = sent_parcels_raw.data.map(i => ({...i, role: "SENDER"}));
        const all_parcels = [...sent_parcels, ...received_parcels]
        setReceived_parcels(received_parcels);
        setSent_parcels(sent_parcels);
        setAll_parcels(all_parcels);
        setParcels(all_parcels);
        console.log("SENT",sent_parcels);

        setParcels(all_parcels);
        console.log(all_parcels);

      } catch (error) {
        console.error('Error during fetch:', error);
        console.log('test');
        navigate('/login')
      }
    };

    if (user && user.token ) {
      fetchParcels();
    } else if (user === '') {
      navigate("/login");
    }
  }, [user, user.token, navigate]);





  const showReceived = () => {
    setParcels(received_parcels);
    console.log(received_parcels);
  }

  const showSent = () => {
    setParcels(sent_parcels);
    console.log(sent_parcels);
  }

  const showAll = () => {
    setParcels(all_parcels)
    console.log(all_parcels);
  }




     
  return (
    <div>
          <img 
              src = {logo}
              style={{ width: '8%', height: 'auto', maxWidth: '45px', padding: '1.5vh'}}
              alt = "?"
          />
          
          
          <nav className= {styles.testnav}>
            <Link to={`/send`}  className = {styles.myparcels_link}> Send parcel </Link> 
            <details className = {styles.myparcels_dropdown}>
              <summary>
                <Link to="/parcels"  className = {styles.myparcels_link} >Parcels </Link>
              </summary>
              <div className = {styles.myparcels_dropdown_ch}>
              <Link to="/parcels" className = {styles.myparcels_link} onClick={showAll}>All  </Link><br/>
              <Link to="/parcels" className = {styles.myparcels_link} onClick={showSent}>Sent  </Link><br/>
              <Link to="/parcels" className = {styles.myparcels_link} onClick={showReceived}>Received  </Link>
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
              <tr>
                <th className = {styles.pth} > Parcel ID </th>
                <th className = {styles.pth} > Date </th>
                <th className = {styles.pth} > Status </th>
              </tr>
             </thead>
              <tbody>
                {parcels.length > 0 ? (
                parcels.map((parcel) => (
                  <Parcel
                    parcelID={parcel.id}
                    date={parcel.dateCreated}
                    status={parcel.status}
                    role={parcel.role}
                    key={parcel.id}
                  />
                ))) : (
                  <tr>
                    <td className = {styles.tableC}></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
    </div>
  );
};

export default ParcelsView;