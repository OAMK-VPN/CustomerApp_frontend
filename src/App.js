import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/homepage/HomePage';
import Login from './components/login/Login'

const App = () => {
  const [isHomePage, setIsHomePage] = useState(true);

  return (
    <div>
      {isHomePage && <HomePage />}
    </div>

  );
};

export default App;