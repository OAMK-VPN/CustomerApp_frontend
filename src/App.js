import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import HomePage from './Pages/homepage/HomePage';
//import Login from './Pages/login/Login';
//import SignUp from './Pages/CreateAccount/SignUp';
import { AuthProvider } from './AuthContext';
import RestorePassword from './Pages/RestorePassword/RestorePassword';
import ParcelsView from './Pages/ParcelsAllViews/ParcelsView';
import FillUpParcelSizes from './Pages/sendingParcel/FillUpParcelSizes';
import FillUpRecieverInfo from './Pages/sendingParcel/FillUpRecieverInfo';
import Parceldetails from './Pages/ParcelsAllViews/Parceldetails';
import Usrsettings from './Pages/UserAccount/Usrsettings';
import NotFound from './Pages/NotFound/NotFound';
import Loadsk from './Loadsk';

const Login = lazy(() => import('./Pages/login/Login'))
const Signup = lazy(() => import('./Pages/CreateAccount/SignUp'))

const App = () => {
  const navigate = useNavigate();
  return (
    
      <div>
        <AuthProvider>
        <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/login" element={
              <ErrorBoundary
                FallbackComponent={<NotFound/>}
                onReset={() => navigate('/')}>
                <Suspense fallback = {<Loadsk/>}>
                  <Login />
                </Suspense>
              </ErrorBoundary>} 
            />
            
            <Route path="/signup" element={
              <ErrorBoundary
                FallbackComponent={<NotFound/>}
                onReset={() => navigate('/')}>
                <Suspense fallback = {<Loadsk/>}>
                  <Signup />
                </Suspense>
              </ErrorBoundary>} 
            />

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
