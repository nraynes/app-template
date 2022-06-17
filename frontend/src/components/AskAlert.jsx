import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography } from '@mui/material';
import Button from './Button';
import { commonFormColor } from '@/config/config';

const AskAlert = ({ onClose, title, message, allowEnter, element, ...args }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && allowEnter) {
      onClose(true);
    }
  };

  return (
    <Dialog
      onKeyDown={(event) => { handleKeyPress(event); }}
      tabIndex="0"
      PaperProps={{
        sx: {
          borderRadius: '0.5em',
          backgroundColor: `rgba(${commonFormColor.main})`,
        },
      }}
      {...args}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h5" sx={{ color: `rgba(${commonFormColor.opposingText.main})` }} component="p">{title}</Typography>
      </DialogTitle>
      <DialogContent id="alert-dialog-description">
        <Typography sx={{ color: `rgba(${commonFormColor.opposingText.main})` }} style={{ whiteSpace: 'pre-line' }}>{message}</Typography>
        {element && element}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => { onClose(false); }}>
          No
        </Button>
        <Button variant='contained' onClick={() => { onClose(true); }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AskAlert;
