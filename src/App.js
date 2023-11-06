import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/homepage/HomePage';
import Login from './Pages/login/Login'
import Signup from './Pages/signup/SignUp'

const App = () => {

  return (
    <Router>
      <div style={{marginBottom:0,}}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    
      </div>
    </Router>
  );
};

export default App;
