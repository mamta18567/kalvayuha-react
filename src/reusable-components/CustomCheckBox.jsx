import React from 'react';
import CircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Checkbox, FormControlLabel } from '@mui/material';

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CircleIcon />}
          checked={checked}
          onChange={onChange}
          sx={{
            '&.Mui-checked': {
              color: '#1D4C6A',
            }
          }}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
