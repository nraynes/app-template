import React from 'react';
import Box from '@mui/system/Box';
import { commonFormColor, commonFormOpacity } from '@/config/config';

function Card({ children, sx, type, ...args }) {
  const sxObj = {
    boxShadow: '0 0 1rem 0 rgba(255, 255, 255, .3)',
    borderRadius: '1em',
    maxWidth: '100vw',
    margin: '1em',
    backgroundColor: `rgba(${commonFormColor.main}, ${commonFormOpacity})`,
    ...sx
  };
  if (type === 2) {
    sxObj.width = [['75%', '90%'], ['max-content', '30em']];
  }
  return (
    <Box
      sx={sxObj}
      {...args}
    >
      {children}
    </Box>
  );
}

export default Card;