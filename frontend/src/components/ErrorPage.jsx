import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

function ErrorPage(props) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Ooops, something went wrong :(</Typography>
        <Button onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </Box>
    </Box>
  );
}

export default ErrorPage;