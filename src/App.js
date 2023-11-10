import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/homepage/HomePage';
import Login from './Pages/login/Login';
import Signup, { SignUp } from './Pages/CreateAccount/SignUp';

import RestorePassword from './Pages/RestorePassword/RestorePassword';
import ParcelsView from './Pages/ParcelsAllViews/ParcelsView';
import ParcelDetailsView from './Pages/ParcelsAllViews/ParcelDetailsView';
import FillUpParcelSizes from './Pages/sendingParcel/FillUpParcelSizes';
import FillUpRecieverInfo from './Pages/sendingParcel/FillUpRecieverInfo';
import ParcelDetails from './Pages/ParcelsAllViews/Parceldetails';


const App = () => {

  return (
    
      <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/CreateAccount" element={<SignUp />} />
            <Route path="/RestorePassword" element={<RestorePassword />} />

            <Route path="/:userName/ParcelsView" element={<ParcelsView />} />
            <Route path="/:userName/Parcels/:parcelID"  element={<ParcelDetails />} />
            <Route path='/:userName/FillUpParcelSizes' element={<FillUpParcelSizes />} />
            <Route path='/:userName/FillUpRecieverInfo' element={<FillUpRecieverInfo />} /> 
        </Routes>
    
      </div>
    
  );
};

export default App;
