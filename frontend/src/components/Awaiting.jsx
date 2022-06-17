import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

function Awaiting({ open }) {
  return open && (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, p: '1em' }}>
      <CircularProgress />
    </Box>
  );
}

export default Awaiting;