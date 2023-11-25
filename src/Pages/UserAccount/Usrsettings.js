import styles from './Usrsetings.module.css'
import { usersAPI } from "../../Instance";
import { useState, useEffect } from "react";
import Getback from "../../modules/Getback";
import CustomPrompt from "./P_prompt";


const Usrsettings = () => {
    const [showPrompt, setshowPrompt] = useState(false);
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
                const response = await usersAPI.get('/authUser/getAuthUser')
                const userdata = response.data;
                setSettings({
                    email: userdata.email,
                    address: userdata.address,
                    city: userdata.city,
                    postalCode: userdata.zipcode,
                    name: userdata.fullname,
                    username: userdata.username,
                })
          } catch (error) {
            console.error('Error during fetch:', error);
          }
        };
    
        fetchSettings();
      }, []);





    const handleDelete = () => {
        const confirm = prompt(`To confirm this, please type: ${settings.email}`)
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
            <Getback/>
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
                <label className = {styles.settings_label}>Username</label>
                <input 
                className = {styles.input_box} 
                disabled = {true}
                value = {settings.username} 
                name = "username" 
                type="text" 
                />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
            <button className = {styles.buttn} onClick={() => {setshowPrompt(true)}}>Update password</button>
            <button className = {styles.buttn} onClick={handleDelete}>Update settings</button>
            <button className = {styles.buttn} onClick={handleDelete} type = "button">Delete account</button>
            {showPrompt && <CustomPrompt showPrompt={showPrompt} setshowPrompt={setshowPrompt}/>}
            </div>    
        </div>
        </div> 
        
        
        )}

export default Usrsettings;