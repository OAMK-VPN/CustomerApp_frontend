import React from 'react';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import HomePage from './Pages/homepage/HomePage';
import { AuthProvider } from './AuthContext';
import RestorePassword from './Pages/RestorePassword/RestorePassword';
import ParcelsView from './Pages/ParcelsAllViews/ParcelsView';
import Parceldetails from './Pages/ParcelsAllViews/Parceldetails';
import Usrsettings from './Pages/UserAccount/Usrsettings';
import NotFound from './Pages/NotFound/NotFound';
import ParcelSending from './Pages/sendingParcel/ParcelSending'
import Loadsk from './Loadsk';
import Tracking from './Pages/Track/Track';

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
            <Route path="/track" element={<Tracking />} />
            <Route path="/parcels/:parcelID"  element={<Parceldetails />} />
            <Route path="/settings" element={<Usrsettings />} /> {/* will be changed */}
            <Route path = '/send' element = {<ParcelSending />} />
            <Route path = '*' element = {<NotFound />} />
        </Routes>
        </AuthProvider>
      </div>
    
  );
};

export default App;
