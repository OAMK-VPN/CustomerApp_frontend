import notfound from '../../assets/404err.png'
import styles from './NotFound.module.css'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const navigate = useNavigate();
    const handleclick = () => {
        return navigate('/')
    }
    return (
    <div className= {styles.pdiv}>
        <img 
        src = {notfound}
        className = {styles.notfound}
        />
        <button className = {styles.button_back} onClick={handleclick}>{'<'} Back to home</button>
    </div>
    
    )
}



export default NotFound;