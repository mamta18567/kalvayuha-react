/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useReducer } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import CustomButton from '../reusable-components/CustomButton';
import { verifyOTP } from '../utils/auth/auth';
import { useSelector } from 'react-redux';
import useRedirect from '../hooks/useRedirect';
import '../styles/verifyotp.scss'

const formConfig = {
  otp: {
    label: 'OTP Code',
    required: true,
    validator: (value) => (value.length === 6 && /^\d+$/.test(value) ? '' : 'OTP must be 6 digits'),
  },
};

const initialState = {
  formData: {
    otp: '',
  },
  errors: {
    otpError: '',
  },
  formIsValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: formConfig[action.field].validator(action.value),
        },
      };
    case 'SET_VALIDITY':
      return {
        ...state,
        formIsValid: action.isValid,
      };
    default:
      return state;
  }
};

const OtpVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [state, dispatchForm] = useReducer(formReducer, initialState);
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

  const validateOTP = (currentOtp) => {
    const isValid = currentOtp.every((digit) => /^\d$/.test(digit)) && currentOtp.length === 6 && !currentOtp.includes('');
    dispatchForm({ type: 'SET_VALIDITY', isValid });
  };


  const handleOTPChange = (e, index) => {
    const otpValue = e.target.value;
    const newOtp = [...otp];

    if (otpValue === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    if (/^\d$/.test(otpValue)) {
      newOtp[index] = otpValue;
      setOtp(newOtp);
      validateOTP(newOtp)

      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, otp.length);
    if (/^[0-9]*$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(otp.length - pastedData.length).fill(''));
      setOtp(newOtp);
      validateOTP(newOtp)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.formIsValid) {
      const otpCode = otp.join('');
      const result = await verifyOTP(otpCode);
      if (result.status_code === 1) {
        toast.success(result.message);
        navigate('/home')
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error("Please enter a valid OTP.");
    }
  };

  return (
    <Stack className="container" direction={{ xs: 'column', md: 'row' }} height="100vh">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="otp-container">
        <Typography variant="h4" textAlign="center" gutterBottom className="heading-text">
          Enter the Code
        </Typography>
        <Typography variant="subtitle1" textAlign="center" gutterBottom className="text">
          Enter the OTP code that we sent to your phone number <Typography className='text' variant='subtitle-1'>+91 - - - - - - - - - -</Typography>
        </Typography>
        <Typography variant="subtitle1" textAlign="center" gutterBottom className="text">
          Be careful not to share the code with anyone
        </Typography>

        <Stack spacing={2}>
          <Box className="flex-box otp-digits">
            {otp.map((digit, index) => (
              <input
                className='otp-input'
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                placeholder='-'
                onChange={(e) => handleOTPChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                maxLength={1}
              />
            ))}
          </Box>
        </Stack>

        <Box className="otp-btn-container">
          <CustomButton
            label="Verify OTP"
            type="submit"
            disabled={!state.formIsValid}
            color="#fff"
            bgcolor="#1D4C6A"
          />
        </Box>

        <Typography className='start-text' variant="subtitle1">
          One step more to get started
        </Typography>
      </Box>
    </Stack>
  );
};

export default OtpVerification;
