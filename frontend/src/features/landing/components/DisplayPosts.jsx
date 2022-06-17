import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { commonFormColor } from '@/config/config';

function DisplayPosts({ posts }) {
  return (
    <Box
      sx={{
        border: `1px solid rgba(${commonFormColor.opposingText.main})`,
        borderRadius: '0.5em',
        p: '0.5em',
        maxHeight: '40vh',
        overflow: 'scroll',
        my: '1em',
        backgroundColor: `rgba(${commonFormColor.dark})`,
      }}
    >
      {posts.map((item) => (
        <Box
          sx={{
            border: `1px solid rgba(${commonFormColor.opposingText.main})`,
            borderRadius: '0.5em',
            p: '0.5em',
            my: '0.5em',
            backgroundColor: `rgba(${commonFormColor.light})`,
            boxShadow: '0 0 1rem 0 rgba(0, 0, 0, .3)',
          }}
        >
          <Typography sx={{ color: `rgba(${commonFormColor.opposingText.main})` }}>{item}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default DisplayPosts;