import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { appStore } from './utils/store/appStore';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme, useMediaQuery, CircularProgress, Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './components/home';
import NotFound from './reusable-components/NotFound';
import SignUp from './components/signup';
import OtpVerification from './components/verifyOTP'
import NavBar from './reusable-components/NavBar';

const MainRoutes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className='flex-box'>
      <div style={{ width: isMobile ? '0%' : '30%' }}>
        <NavBar />
      </div>
      <div style={{ width: isMobile ? '100%' : '70%' }}>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/otp-verification' element={<OtpVerification />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={appStore}>
      <Router>
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        }>
          <Routes>
            <Route path="/*" element={<MainRoutes />} />
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </Provider>
  );
};

export default App;
