import React from 'react';
import logo from '../../assets/logo.png'
import './Header.css'


const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <div className="login-container">
        <a href="/login">Login</a>
      </div>
    </header>
  )
}

export default Header;