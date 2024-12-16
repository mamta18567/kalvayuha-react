import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ label, bgcolor, color, disabled, ...props }) => {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      sx={{
        textTransform: 'none'
      }}

      style={{ backgroundColor: bgcolor, color: color, fontSize: '16px', width: '100%', border: props?.border }}
      {...props}
    >
      {props.icon ? <img
        src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png"
        alt="Google"
        style={{ width: '20px', height: '20px', marginRight: '0.3rem', paddingBottom: '0.1rem' }}
      /> : ""}
      {label}
    </Button>
  );
};

export default CustomButton;
