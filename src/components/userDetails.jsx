import React from 'react'
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const user = useSelector((state) => state.user.user);
  return (
      <Box>
        <Typography variant="h5" style={{fontWeight: 'bold'}} gutterBottom className="heading-text">
          Your Details
        </Typography>
        <Typography variant="subtitle1" gutterBottom style={{display: 'flex',gap: '0.2rem', alignContent: 'center' }} >
          <Typography style={{fontWeight: 'bold'}}>Full Name:</Typography> {user.username}
        </Typography>
        <Typography variant="subtitle1" gutterBottom style={{display: 'flex',gap: '0.2rem', alignContent: 'center' }} >
          <Typography style={{fontWeight: 'bold'}}>Email:</Typography> {user.email}
        </Typography>
      </Box>
  )
}

export default UserDetails