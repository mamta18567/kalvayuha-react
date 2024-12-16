import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound = () => {

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center', 
      }}
    >
      <Typography variant="h3" color="#1D4C6A" gutterBottom>
        Error: 404 :(
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
