import { Routes, Route, Link, useNavigate} from "react-router-dom";
import styles from './ParcelSending.module.css'
import getback from '../../assets/get_back.svg'
import axios from "axios";
import api from "../../Instance";
import { useAuth } from "../../AuthContext";
import { useState, useEffect } from "react";
import InputF from './Sending_input'

const Usrsettings = () => {
    const {user} = useAuth();
    const [settings, setSettings] = useState({
        email: '',
        address: '',
        city: '',
        postalCode: '',
        name: '',
    });

    const [sdata, setsData] = useState({
        sender_name: '',
        sender_email: '',
        sender_address: '',
        sender_city: '',
        sender_postalCode: '',
        
        recipient_name: '',
        recipient_email: '',
        recipient_address: '',
        recipient_city: '',
        recipient_postalCode: '',

        parcel_weight: '',
        parcel_height: '',
        parcel_length: '',
        parcel_width: '',

        drop_off: ["location1", "location2", "location3", "location4", "location5"],
        pickup: [],
    });



    const handleSettingsUpdate = (e) => {
        console.log("before", settings.city)
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
        console.log("after", settings.email)
    };

    useEffect(() => {
        const fetchSettings = async () => {
          try {
            const response = await api.get('/user_settings', {
              headers: {
                Authorization: user.token, // bearer
              },
            });
            const userSettings = response.data;
            setSettings({
                email: userSettings.email,
                address: userSettings.address,
                city: userSettings.city,
                postalCode: userSettings.postalCode,
                name: userSettings.name,
            })
          } catch (error) {
            console.error('Error during fetch:', error);
          }
        };
    
        fetchSettings();
      }, [user.token]);





    return (
        <div className = {styles.parent_container}>
          <div className = {styles.footer}>
            <Link to = '/parcels' className={styles.getbackLink}>Get back</Link>
          </div>
          
          <div className= {styles.input_container}>
            <p className = {styles.pl}>Sending</p>
          </div>

        <div className={styles.input_container}>
          <InputF 
            label = "Your name"
            disabled = {true}
            value = {settings.name}
            name = "name"
            type = "text"
          />
          <InputF 
            label = "Recipient's name"
            placeholder=""
            name = "name"
            type = "text"
          /> 
        </div>



        <div className={styles.input_container}>
            <InputF 
              label = "Your email"
              disabled = {true}
              value = {settings.email}
              name = "sender_email"
              type = "email"
            />
            <InputF 
              label = "Recipient's email"
              onChange = {handleSettingsUpdate}
              placeholder=""
              name = ""
              type = "email"
            />
        </div>


        <div className={styles.input_container}>
            <InputF 
              label = "Your address"
              disabled = {true}
              value = {settings.address} 
              name = "sender_address"
              type = "text"
            />    
            
            <InputF 
              label = "Recipient's address"
              onChange = {handleSettingsUpdate}
              placeholder=""
              name = ""
              type = "text"
            />
        </div>


        <div className={styles.input_container}>
            <InputF 
              label = "Your zip"
              disabled = {true}
              value = {settings.postalCode}
              name = "address"
              type = "number"
            />

            <InputF 
              label = "Recipient's zip"
              onChange = {handleSettingsUpdate} 
              placeholder=""
              name=""
              type="number" 
            />
        </div>

        <div className= {styles.input_container}>
            <p className = {styles.pl}>Parcel info</p>
          </div>

        <div className={styles.input_container}>
            <InputF 
              label = "weight (kg)"
              onChange = {handleSettingsUpdate} 
              placeholder = ""
              name = "parcel_weight"
              type = "number" 
            />

            <InputF 
              label = "height (cm)"
              onChange = {handleSettingsUpdate} 
              placeholder = ""
              name = "parcel_height"
              type = "number" 
            /> 
        </div>

        <div className={styles.input_container}>
            <InputF 
              label = "length (cm)"
              onChange = {handleSettingsUpdate} 
              placeholder = ""
              name = "parcel_length"
              type = "number" 
            /> 
            
            <InputF 
              label = "width (cm)"
              onChange = {handleSettingsUpdate} 
              placeholder = ""
              name = "parcel_width"
              type = "number" 
            />  
        </div>

        
        <div className={styles.select_container}>
            <div className={styles.select_child_container}>
                <label  className = {styles.inp_label}>Drop off location</label>
                <select 
                className = {styles.select_box} 
                >
                {sdata.drop_off.map(i => (
                <option key = {i.id} value = {i}>
                    {i}
                </option>
                ))}
                </select>
            <div className={styles.select_child_container}>
                <label  className = {styles.inp_label}>Pickup location</label>
                <select 
                className = {styles.select_box} 
                >
                {sdata.drop_off.map(i => (
                <option key = {i.id} value = {i}>
                    {i}
                </option>
                ))}
                </select>
            </div>
            </div>    
            
        </div>

        

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
            <button className = {styles.buttn}>Send a parcel</button>
            </div>    
        </div>
        </div> 
        
        )}

export default Usrsettings;