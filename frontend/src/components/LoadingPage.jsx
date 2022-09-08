import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

function LoadingPage() {
  return (
    <Box id="loading-page" data-testid="loading-page" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <CircularProgress id="loading-progress" data-testid="loading-progress" />
    </Box>
  );
}

export default LoadingPage;