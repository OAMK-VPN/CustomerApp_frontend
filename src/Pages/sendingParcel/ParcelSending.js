import { Routes, Route, Link, useNavigate} from "react-router-dom";
import styles from './ParcelSending.module.css'
import getback from '../../assets/get_back.svg'
import axios from "axios";
import api from "../../Instance";
import { useAuth } from "../../AuthContext";
import { useState, useEffect } from "react";

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
      }, []);





    return (
        <div className = {styles.parent_container}>
          <div className = {styles.footer}>
            <Link to = '/parcels' className={styles.getbackLink}>Get back</Link>
          </div>
          
          <div className= {styles.input_container}>
            <p className = {styles.pl}>Sending</p>
          </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>Your name</label>
                <input 
                className = {styles.input_box} 
                disabled = {true} 
                value = {settings.name} 
                name = "name" 
                type="text" 
                />
            </div>
            
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>Recipient's name</label>
                <input 
                className = {styles.input_box}   
                name = "name" 
                placeholder=""
                type="text" 
                />
            </div>    
        </div>



        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>Your email </label>
                <input 
                className = {styles.input_box} 
                disabled = {true}
                value = {settings.email} 
                name = "email" 
                type="email" 
                />
            </div>
            
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>Recipient's email</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}
                placeholder=""  
                type="text" 
                />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>Your address </label>
                <input 
                className = {styles.input_box} 
                disabled = {true}
                value = {settings.address} 
                name = "address" 
                type="text" 
                />
            </div>
            
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>Recipient's address</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                placeholder=""
                type="text" 
                />
            </div>    
        </div>


        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>Your zip </label>
                <input 
                className = {styles.input_box} 
                disabled = {true}
                value = {settings.postalCode} 
                name = "address" 
                type="number"
                />
            </div>
            
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>Recipient's zip</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                placeholder=""
                type="number" 
                />
            </div>    
        </div>

        <div className= {styles.input_container}>
            <p className = {styles.pl}>Parcel info</p>
          </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>weight (kg) </label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                placeholder=""  
                type="email" 
                />
            </div>
            
            <div className={styles.input_child_container}>
                <label  className = {styles.inp_label}>height (cm)</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate} 
                placeholder=""   
                type="number" 
                />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.inp_label}>length (cm) </label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                placeholder=""  
                type="number" 
                />
            </div>
            
            <div className={styles.input_child_container}>
                <label  className = {styles.inp_label}>width (cm)</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                placeholder=""  
                type="number" 
                />
            </div>    
        </div>

        
        <div className={styles.input_container}>
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