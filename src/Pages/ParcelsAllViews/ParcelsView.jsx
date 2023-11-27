import React, {useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';

import { parcelsAPI } from "../../Instance";
import Parcel from "./Parcel";
import logo from "../../assets/test_logo.svg"
import styles from "./ParcelsView.module.css";



const ParcelsView = () => {
  const [received_parcels, setReceived_parcels] = useState([]);
  const [sent_parcels, setSent_parcels] = useState([]);
  const [all_parcels, setAll_parcels] = useState([]);
  const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const received_parcels_raw = await parcelsAPI.get('/receiver');
        await new Promise(resolve => setTimeout(resolve, 100)) // promise all
        const sent_parcels_raw = await parcelsAPI.get('/sender');
        

        const received_parcels = received_parcels_raw.data.map(i => ({...i, role: "RECEIVER"}));
        const sent_parcels = sent_parcels_raw.data.map(i => ({...i, role: "SENDER"}));
        const all_parcels = [...sent_parcels, ...received_parcels]

        setReceived_parcels(received_parcels);
        setSent_parcels(sent_parcels);
        setAll_parcels(all_parcels);
        setParcels(all_parcels);

      } 
      catch (error) {
        navigate('/login', {replace: true});
        return
      }
      finally {
        setLoading(false);
      }
    };



    if (token) {
      fetchParcels();
    } else {
      navigate("/login", {replace: true});
      return
    }
  }, [token, navigate]);

  if (loading) {
    return <></>
  }





  const showReceived = () => {
    setParcels(received_parcels);
  }

  const showSent = () => {
    setParcels(sent_parcels);
  }

  const showAll = () => {
    setParcels(all_parcels)
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    return;
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
                <Link to="/parcels"  className = {styles.myparcels_link} > Parcels </Link>
              </summary>
              <div className = {styles.myparcels_dropdown_ch}>
              <Link to="/parcels" className = {styles.myparcels_link} onClick={showAll}>All  </Link><br/>
              <Link to="/parcels" className = {styles.myparcels_link} onClick={showSent}>Sent  </Link><br/>
              <Link to="/parcels" className = {styles.myparcels_link} onClick={showReceived}>Received  </Link>
              </div>
            </details>
            <Link to="/track" className = {styles.myparcels_link}> Track  </Link>
            <Link to={`/`} className = {styles.myparcels_link} onClick={handleLogout}> Logout  </Link> 
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