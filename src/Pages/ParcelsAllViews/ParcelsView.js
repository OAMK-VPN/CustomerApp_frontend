import React, {useEffect, useState} from "react";
import {useParams,Link} from "react-router-dom";
import styles from "./ParcelsView.module.css";
import Parcel from "./Parcel";
import ParcelDetails from "./Parceldetails";
import { useAuth } from "../../AuthContext";
import { useNavigate } from 'react-router-dom';

const ParcelsView = () => {
  const { state, dispatch } = useAuth();
  const [parcels, setParcels] = useState([]);

  const navigate = useNavigate();
  const userName = state.userName;

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' }); // ???
    navigate('/');
  }


  useEffect(() => {
    console.log(state.isAuthenticated)
    const fetchParcels = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/parcels`, {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setParcels(data);
          dispatch({ type: 'LOGIN' });

        } else {
          console.error('Failed to fetch parcels:', response.statusText);
        }


      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    if (state.isAuthenticated) {
      fetchParcels();
    } else {
      dispatch({ type: 'LOGOUT' });
      navigate('/login');
    }
  }, [state.isAuthenticated, dispatch, navigate]);




     
  return (
    <div>
      {state.isAuthenticated ? (
        // Render the component content only if authenticated
        <>
          <h1>Posti</h1>
          <nav>
            <Link to={`/${userName}/FillUpParcelSizes`}>Send</Link> <br/>
            <Link to="/history">History  </Link> <br/>
            <Link to="/track">Track  </Link> <br/>
            <button onClick = {handleLogout}>Logout </button> <br/>
            <Link to={`/${userName}/Settings`}> Settings  </Link> 
          </nav>

          <div className={styles.parcelsTable}>
            <table className={styles.th}>
              <thead>
                <tr>
                  <th>Parcel ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
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
        </>
      ) : (
        navigate('/login')
      )}
    </div>
  );
};

export default ParcelsView;