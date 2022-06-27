import React from 'react';
import { Box } from '@mui/system';
import { Typography, Slider } from '@mui/material';
import { onMobile } from '@/config/config';

function TransparencySetter({ defaultValue, onChange, label, orientation = 'vertical', id, ...args }) {
  const sliderLength = {};
  const boxSx = {};
  const labelSx = {};
  const sliderLengthValue = onMobile ? '6em' : '10em';
  const marginFactor = onMobile ? 0.8 : 1;

  if (orientation === 'vertical') {
    sliderLength.height = sliderLengthValue;
    boxSx.width = '6em';
    boxSx.px = `${marginFactor/2}em`;
    boxSx.pt = `${marginFactor/2}em`;
    boxSx.pb = `${marginFactor}em`;
    boxSx['&:hover'] = {
      px: `${marginFactor*0.7}em`,
      pt: `${marginFactor*0.7}em`,
      pb: `${marginFactor*1.2}em`,
    };
    labelSx.mb = '1em';
  } else if (orientation === 'horizontal') {
    sliderLength.width = sliderLengthValue;
    boxSx.px = `${marginFactor}em`;
    boxSx.py = `${marginFactor/2}em`;
    boxSx['&:hover'] = {
      px: `${marginFactor*1.2}em`,
      py: `${marginFactor*0.7}em`,
    };
  }


  
  return (
    <Box
      id={id}
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
      {...args}
    >
      <Typography id={`${id}_label`} sx={{ cursor: 'default', wrap: 'break-word', textAlign: 'center', ...labelSx }}>{label}</Typography>
      <Slider
        id={`${id}_slider`}
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