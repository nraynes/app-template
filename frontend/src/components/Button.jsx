import React from 'react';
import { Button as GoogleButton } from '@mui/material';
import { buttonColor, buttonOpacity } from '@/config/config'

function Button({ children, sx, ...args }) {
  const componentColor = buttonColor
  return (
    <GoogleButton
      sx={{
        color: `rgba(${componentColor.opposingText.main})`,
        backgroundColor: `rgba(${componentColor.main}, ${buttonOpacity})`,
        '&:hover': {
          backgroundColor: `rgba(${componentColor.light}, ${buttonOpacity})`,
        },
        ...sx
      }}
      {...args}
    >
      {children}
    </GoogleButton>
  );
}

export default Button;