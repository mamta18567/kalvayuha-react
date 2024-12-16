import { CircularProgress, Box, Typography } from '@mui/material';
import React from 'react';

const Loader =() => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress sx={{ color: '#1D4C6A', mb: 2 }} />
      <Typography variant="h6" color="#1D4C6A">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loader;
