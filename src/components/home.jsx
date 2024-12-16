/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import useRedirect from '../hooks/useRedirect';

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useRedirect();

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Box className="flex-box">
      <h1>Welcome {user.username}</h1>
    </Box>
  );
};

export default Home;
