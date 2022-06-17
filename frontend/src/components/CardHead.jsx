import React from 'react';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import { commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';

function CardHead({ children, sx, ...args }) {
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  return (
    <Box
      sx={{
        borderBottom: `2px solid rgba(${opposingColor})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'max-content',
        py: '0.3em',
        ...sx
      }}
      {...args}
    >
      <Typography sx={{ color: `rgba(${opposingColor})` }} variant="h6">{children}</Typography>
    </Box>
  );
}

export default CardHead;