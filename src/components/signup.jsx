import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validateFormFields, emailValidation, passwordValidation, phoneNumberValidation } from '../utils/Validations/formValidations';
import { registerUser } from '../utils/auth/auth';
import { signupUser } from '../utils/store/slice/userSlice';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import CustomButton from '../reusable-components/CustomButton';
import CustomTextField from '../reusable-components/CustomTextField';
import CustomCheckbox from '../reusable-components/CustomCheckBox';
import '../styles/signup.scss';
import { Link } from 'react-router-dom';
import useRedirect from '../hooks/useRedirect';

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  formIsValid: false,
  isChecked: false,
  showPassword: false,
};

const formConfig = {
  firstName: {
    label: 'First Name',
    required: true,
    validator: (value) => (value ? '' : 'First name is required'),
  },
  lastName: {
    label: 'Last Name',
    required: false,
    validator: () => '',
  },
  email: {
    label: 'Email Address',
    required: true,
    validator: (value) => (emailValidation(value) ? '' : 'Invalid email address'),
  },
  phone: {
    label: 'Phone',
    required: true,
    validator: (value) => (phoneNumberValidation(value) ? '' : 'Invalid Phone Number'),
    component: PhoneInput,
  },
  password: {
    label: 'Enter your password',
    required: true,
    validator: (value) =>
      passwordValidation(value)
        ? ''
        : 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character',
  },
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
          [action.field]: formConfig[action.field]?.validator(action.value, state),
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };
    case 'SET_VALIDITY':
      return {
        ...state,
        formIsValid: action.isValid,
      };
    case 'SET_CHECKBOX':
      return {
        ...state,
        isChecked: action.checked,
      };
    case 'TOGGLE_SHOW_PASSWORD':
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    default:
      return state;
  }
};

const SignUp = () => {


  const dispatch = useDispatch();
  const navigate = useRedirect();
  const [state, dispatchForm] = useReducer(formReducer, initialState);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
        error = value ? '' : 'First name is required';
        break;
      case 'lastName':
        error = '';
        break;
      case 'email':
        error = emailValidation(value) ? '' : 'Invalid email address';
        break;
      case 'password':
        error = passwordValidation(value)
          ? ''
          : 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character';
        break;
      case 'phone':
        error = phoneNumberValidation(value) ? '' : 'Invalid Phone Number';
        break;
      default:
        break;
    }

    dispatchForm({ type: 'SET_ERROR', field: name, error });

    const isFormValid = validateFormFields({
      formData: state.formData,
      errors: {
        ...state.errors,
        [name]: error,
      },
      requiredFields: ['firstName', 'email', 'password', 'phone'],
    });

    dispatchForm({ type: 'SET_VALIDITY', isValid: isFormValid });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.isChecked && state.formIsValid) {
      const result = await registerUser(
        state.formData.firstName,
        state.formData.lastName,
        state.formData.email,
        state.formData.password,
      );
      if (result.status_code === 1) {
        dispatch(
          signupUser({
            email: state.formData.email,
            password: state.formData.password,
            username: `${state.formData.firstName} ${state.formData.lastName}`,
          })
        );
        toast.success(result.message);
        navigate('/otp-verification');
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatchForm({ type: 'SET_FIELD_VALUE', field: name, value });
    validateField(name, value);
  };

  return (
    <Stack className="container" direction={{ xs: 'column', md: 'row' }} height="100vh">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ pt: 2 }} className="right-container">
        <Typography
          variant="subtitle1"
          textAlign="center"
          gutterBottom
          sx={{
            fontSize: { xs: '1.2rem', md: '2rem', },
            fontWeight: { xs: 'bold', md: 'bold' },
            color: '#1D4C6A', marginTop: '0.5rem'
          }}
        >
          Create an Account :)
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.8rem', md: '1rem', },
          }}
          variant="subtitle1" textAlign="center" gutterBottom className="text">
          Let’s get started with your 90 days free trial
        </Typography>
        <Stack spacing={2} className="form">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomTextField
              label={formConfig.firstName.label}
              field="firstName"
              value={state.formData.firstName}
              error={state.errors.firstName}
              helperText={state.errors.firstName}
              required={formConfig.firstName.required}
              onChange={handleInputChange}
            />
            <CustomTextField
              label={formConfig.lastName.label}
              field="lastName"
              value={state.formData.lastName}
              error={state.errors.lastName}
              helperText={state.errors.lastName}
              required={formConfig.lastName.required}
              onChange={handleInputChange}
            />
          </Stack>

          {['email', 'phone', 'password'].map((field) => (
            <Stack key={field}>
              {field !== 'phone' ? (
                <CustomTextField
                  label={formConfig[field].label}
                  field={field}
                  value={state.formData[field]}
                  error={state.errors[field]}
                  helperText={state.errors[field]}
                  required={formConfig[field].required}
                  onChange={handleInputChange}
                />
              ) : (
                <>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    name={field}
                    value={state.formData[field]}
                    onChange={(value) => {
                      dispatchForm({ type: 'SET_FIELD_VALUE', field, value: value ?? '' });
                      validateField(field, value || '');
                    }}
                    required={formConfig[field].required}
                  />
                  <Typography sx={{ fontSize: '12px', marginTop: '0.2rem' }}> We will send you a verification OTP on <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }} variant='subtitle-1'>+91 - - - - - - - - - -</Typography></Typography>
                  {state.errors[field] && (
                    <Typography
                      sx={{
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 400,
                        fontSize: '0.75rem',
                        lineHeight: 1.66,
                        letterSpacing: '0.03333em',
                        textAlign: 'left',
                      }}
                      color="#d32f2f"
                    >
                      {state.errors[field]}
                    </Typography>
                  )}
                </>
              )}
            </Stack>
          ))}
          <CustomCheckbox
            label="Yes, I understand and agree to the Terms of Services"
            checked={state.isChecked}
            onChange={(e) => dispatchForm({ type: 'SET_CHECKBOX', checked: e.target.checked })}
          />
          <CustomButton
            label="Create Account"
            type="submit"
            color="#fff"
            bgcolor="#1D4C6A"
            disabled={!state.formIsValid || !state.isChecked}
          />
          <Box style={{ width: '100%', }}>
            <Divider textAlign="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Or
              </Typography>
            </Divider>
          </Box>
          <Typography variant="body2" textAlign="center" className='text'>
            Already have an account?{' '}
            <Link className='link' to="#" underline="hover">
              Sign in
            </Link>
          </Typography>
          <CustomButton
            label="Continue with Google"
            type="submit"
            color="black"
            bgcolor="white"
            border='1px solid gray'
            icon='true'
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default SignUp;
