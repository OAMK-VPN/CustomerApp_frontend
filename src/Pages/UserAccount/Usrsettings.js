import { Routes, Route, Link, useNavigate} from "react-router-dom";
import styles from './Usrsetings.module.css'
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





    const handleDelete = () => {
        const confirm = prompt(`To confirm this, type ${settings.email}`)
        if (confirm !== settings.email) {
            alert("Please try again")
        }
        else {
            alert("Success")
        }
    }


    const handleUpdate = async (e) => {
    e.preventDefault();
    const confirm = prompt("To confirm this, please enter your password")
    if (confirm !== settings.passwordl) {
        alert("Please try again")
    }
    else {
        alert("Success")
    }
}


    return (
        <div className = {styles.parent_container}>
          <div className = {styles.footer}>
            <Link to = '/parcels' className={styles.getbackLink}>Get back</Link>
          </div>
        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label>Email</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.email} 
                name = "email" 
                type="email" 
                />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Full name</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.name} 
                name = "name" 
                type="text" 
                />
            </div>    
        </div>



        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>City</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.city} 
                name = "city" 
                type="text" 
                />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Address</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.address} 
                name = "address" 
                type="text" 
                />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Postal code</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.postalCode} 
                name = "postalCode" 
                type="text" 
                />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Password</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.password} 
                name = "password" 
                type="password" 
                />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>

            <button className = {styles.buttn} onClick={handleUpdate}>Update settings</button>
            <button className = {styles.buttn} onClick={handleDelete}>Delete account</button>
            </div>    
        </div>
        </div> 
        
        
        )}

export default Usrsettings;