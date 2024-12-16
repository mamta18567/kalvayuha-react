import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomTextField = ({
  label,
  field,
  value,
  error,
  helperText,
  required,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      style={{ backgroundColor: '#FCFCFC' }}
      label={label}
      type={field === 'password' && !showPassword ? 'password' : 'text'}
      onChange={onChange}
      fullWidth
      value={value}
      error={error}
      helperText={helperText}
      required={required}
      name={field}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#1D4C6A',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#1D4C6A',
        },

        '& .MuiFormHelperText-root': {
          margin: '3px 0px'
        }
      }}
      InputProps={{
        endAdornment: field === 'password' && (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomTextField;
