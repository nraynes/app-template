import React from 'react';
import { Box } from '@mui/system';
import { Typography, Slider } from '@mui/material';

function TransparencySetter({ defaultValue, onChange, label, orientation = 'vertical' }) {
  const sliderLength = {};
  const boxSx = {};
  const labelSx = {};

  if (orientation === 'vertical') {
    sliderLength.height = '10em';
    boxSx.width = '6em';
    boxSx.px = '0.5em';
    boxSx.pt = '0.5em';
    boxSx.pb = '1em';
    boxSx['&:hover'] = {
      px: '0.7em',
      pt: '0.7em',
      pb: '1.2em',
    };
    labelSx.mb = '1em';
  } else if (orientation === 'horizontal') {
    sliderLength.width = '10em';
    boxSx.px = '1em';
    boxSx.py = '0.5em';
    boxSx['&:hover'] = {
      px: '1.2em',
      py: '0.7em',
    };
  }


  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '1em',
        justifyContent: 'center',
        transition: '0.5s',
        ...boxSx,
      }}
    >
      <Typography sx={{ cursor: 'default', wrap: 'break-word', textAlign: 'center', ...labelSx }}>{label}</Typography>
      <Slider
        defaultValue={defaultValue}
        onChange={onChange}
        orientation={orientation}
        sx={{
          ...sliderLength,
        }} />
    </Box>
  );
}

export default TransparencySetter;