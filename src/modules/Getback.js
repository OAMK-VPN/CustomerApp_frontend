import styles from './Getback.module.css'
import { Link } from "react-router-dom";
const Getback = () => {
    return (

    <div className = {styles.f}>
      <Link to = '/parcels' className={styles.getbackLink}>Get back</Link>
    </div>
    )
}

export default Getback;