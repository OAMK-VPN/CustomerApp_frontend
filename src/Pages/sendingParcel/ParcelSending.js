import styles from './ParcelSending.module.css'
import { parcelsAPI, usersAPI } from "../../Instance";
import { useAuth } from "../../AuthContext";
import { useState, useEffect } from "react";
import InputF from './Sending_input'
import Getback from "../../modules/Getback";
import { debounce } from "lodash";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Usrsettings = () => {
    const {user} = useAuth();
    const notification_toast = (type, message, interval) =>
    toast[type](
      message, 
    { duration: interval,
      style: { color: '#163760', },
      iconTheme: { primary: '#163760', }
    });
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        sender_email: '',
        sender_address: '',
        sender_postalCode: '',
        sender_name: '',
    });

    const [parceldata, setparcelData] = useState({
        recipient_name: '',
        recipient_email: '',
        recipient_address: '',
        recipient_postalCode: '',

        parcel_weight: '',
        parcel_height: '',
        parcel_length: '',
        parcel_width: '',
    });

    const handleParcelUpdate = debounce((e) => {
      setparcelData({
        ...parceldata,
        [e.target.name]: e.target.value,
      });
    }, 100)


    useEffect(() => {
        const fetchSettings = async () => {
          try {
            const response = await usersAPI.get('/authUser/getAuthUser')
            const userdata = response.data;
            setSettings({
                sender_email: userdata.email,
                sender_address: userdata.address,
                sender_postalCode: userdata.zipcode,
                sender_name: userdata.fullname,
            })
          } catch (error) {
            console.error('Error during fetch:', error);
          }
        };
    
        fetchSettings();
      }, [user.token]);

      const handleSend = async(e) => {
        e.preventDefault();
        if (parceldata.recipient_email === settings.sender_email) {
          notification_toast("error", "You can't send a parcel to yourself", 650);
          return null
        }
        try {
          const send_req = await parcelsAPI.post('/buy', {
            emailReceiver: parceldata.recipient_email,
            weigh: parceldata.parcel_weight,
            heigh: parceldata.parcel_height,
            width: parceldata.parcel_width,
            length: parceldata.parcel_length,
          })
          notification_toast("success", "Parsel sent", 650);
          setTimeout(() => {
            navigate(`/parcels`);
          }, 750)
        }
        
        catch (error) {
          console.log("some error");
        }
      }





    return (
        <div className = {styles.parent_container}>
          <form onSubmit={handleSend}>
            <Getback/>
          <div className= {styles.input_container}>
            <p className = {styles.pl}>Sending</p>
          </div>

        <div className={styles.input_container}>
          <InputF 
            label = "Your name"
            disabled = {true}
            value = {settings.sender_name}
            name = "sender_name"
            type = "text"
          />
          <InputF 
            label = "Recipient's name"
            onChange = {handleParcelUpdate}
            name = "recipient_name"
            type = "text"
            pattern="^[a-zA-Z]+(\s[a-zA-Z]+)+$"
            required
          /> 
        </div>



        <div className={styles.input_container}>
            <InputF 
              label = "Your email"
              disabled = {true}
              value = {settings.sender_email}
              name = "sender_email"
              type = "email"
            />
            <InputF 
              label = "Recipient's email"
              onChange = {handleParcelUpdate}
              name = "recipient_email"
              type = "email"
              required
            />
        </div>


        <div className={styles.input_container}>
            <InputF 
              label = "Your address"
              disabled = {true}
              value = {settings.sender_address} 
              name = "sender_address"
              type = "text"
            />    
            
            <InputF 
              label = "Recipient's address"
              onChange = {handleParcelUpdate}
              name = "recipient_address"
              type = "text"
              required
            />
        </div>


        <div className={styles.input_container}>
            <InputF 
              label = "Your zip"
              disabled = {true}
              value = {settings.sender_postalCode}
              name = "sender_postalCode"
              type = "number"
            />

            <InputF 
              label = "Recipient's zip"
              onChange = {handleParcelUpdate} 
              name="recipient_postalCode"
              type="text" 
              pattern="\d{5}"
              required
            />
        </div>

        <div className= {styles.input_container}>
            <p className = {styles.pl}>Parcel info</p>
          </div>

        <div className={styles.input_container}>
            <InputF 
              label = "weight (kg)"
              onChange = {handleParcelUpdate}
              name = "parcel_weight"
              type = "number"
              required 
            />

            <InputF 
              label = "height (cm)"
              onChange = {handleParcelUpdate}
              name = "parcel_height"
              type = "number" 
              required
            /> 
        </div>

        <div className={styles.input_container}>
            <InputF 
              label = "length (cm)"
              onChange = {handleParcelUpdate}
              name = "parcel_length"
              type = "number" 
              required
            /> 
            
            <InputF 
              label = "width (cm)"
              onChange = {handleParcelUpdate}
              name = "parcel_width"
              type = "number" 
              required
            />  
        </div>

        
        

        

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
            <button className = {styles.buttn} type = "submit">Send a parcel</button>
            </div>
        <Toaster/>    
        </div>
        </form>
        </div> 
        
        )}

export default Usrsettings;