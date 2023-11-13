import { Routes, Route, Link, useNavigate} from "react-router-dom";
import styles from './Usrsetings.module.css'
import getback from '../../assets/get_back.svg'
import settings from '../../assets/status_error.svg'
import logo from "../../assets/test_logo.svg"
const Usrsettings = () => {
    return (
        <div className = {styles.parent_container}>
          <div className = {styles.footer}>
            <Link to = '/' className={styles.getbackLink}>Get back</Link>
          </div>


        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label>Email</label>
                <input className = {styles.input_box}  type="email" />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Full name</label>
            <input className = {styles.input_box}  type="text" />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>City</label>
                <input className = {styles.input_box}  type="text" />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Address</label>
            <input className = {styles.input_box}  type="text" />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Postal code</label>
                <input className = {styles.input_box}  type="text" />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Password</label>
            <input className = {styles.input_box} type="text" />
            </div>    
        </div>




        </div> )}

export default Usrsettings;