import React from 'react';
import { TextField as GoogleTextField } from '@mui/material';

function TextField({ children, sx, componentColor, ...args }) {
  return (
    <GoogleTextField
      InputProps={{ sx: { color: `rgba(${componentColor.opposingText.main})` } }}
      MenuProps={{
        sx: {
          backgroundColor: 'white',
        }
      }}
      sx={{
        color: `rgba(${componentColor.opposingText.main})`,
        '& label.Mui-focused': {
          color: `rgba(${componentColor.opposingText.main})`,
        },
        '& label': {
          color: `rgba(${componentColor.opposingText.main})`,
        },
        '& .MuiSvgIcon-root': {
          color: `rgba(${componentColor.opposingText.main})`,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: `rgba(${componentColor.opposingText.light})`,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: `rgba(${componentColor.opposingText.main})`,
          },
          '&:hover fieldset': {
            borderColor: `rgba(${componentColor.opposingText.main})`,
          },
          '&.Mui-focused fieldset': {
            borderColor: `rgba(${componentColor.opposingText.light})`,
          },
        },
        ...sx
      }}
      {...args}
    >
      {children}
    </GoogleTextField>
  );
}

export default TextField;