import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/homepage/HomePage';
import Login from './Pages/login/Login';
import Signup, { SignUp } from './Pages/CreateAccount/SignUp';
import { AuthProvider } from './AuthContext';
import RestorePassword from './Pages/RestorePassword/RestorePassword';
import ParcelsView from './Pages/ParcelsAllViews/ParcelsView';
import FillUpParcelSizes from './Pages/sendingParcel/FillUpParcelSizes';
import FillUpRecieverInfo from './Pages/sendingParcel/FillUpRecieverInfo';
import Parceldetails from './Pages/ParcelsAllViews/Parceldetails';
import Usrsettings from './Pages/UserAccount/Usrsettings';
import NotFound from './Pages/NotFound/NotFound';

const App = () => {

  return (
    
      <div>
        <AuthProvider>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/CreateAccount" element={<SignUp />} />
            <Route path="/RestorePassword" element={<RestorePassword />} />

            <Route path="/parcels" element={<ParcelsView />} />
            <Route path="/parcels/:parcelID"  element={<Parceldetails />} />
            <Route path='/:username/FillUpParcelSizes' element={<FillUpParcelSizes />} />
            <Route path='/:username/FillUpRecieverInfo' element={<FillUpRecieverInfo />} /> 
            <Route path="/settings" element={<Usrsettings />} /> {/* will be changed */}
            <Route path = '*' element = {<NotFound />} />
        </Routes>
        </AuthProvider>
      </div>
    
  );
};

export default App;
