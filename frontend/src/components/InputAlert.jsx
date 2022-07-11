import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography } from '@mui/material';
import Button from './Button';
import TextField from './TextField';
import { commonFormColor } from '@/config/config';

const InputAlert = ({ onClose, title, message, ...args }) => {
  const x = useRef();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClose(x.current.value);
    }
  };

  return (
    <Dialog
      id="alert_dialog"
      data-testid="alert_dialog"
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
      <DialogTitle id="alert-dialog-title" data-testid="alert-dialog-title">
        <Typography sx={{ color: `rgba(${commonFormColor.opposingText.main})` }} variant="h5" component="p">{title}</Typography>
      </DialogTitle>
      <DialogContent id="alert-dialog-description" data-testid="alert-dialog-description">
        <Typography sx={{ color: `rgba(${commonFormColor.opposingText.main})` }} style={{ whiteSpace: 'pre-line' }}>{message}</Typography>
        <TextField id="alert-dialog-input" data-testid="alert-dialog-input" multiline rows={3} componentColor={commonFormColor} inputRef={x} sx={{ width: ['100%', '25em'] }} />
      </DialogContent>
      <DialogActions
        id="alert-dialog-actions"
        data-testid="alert-dialog-actions"
      >
        <Button id="alert-dialog-cancel" data-testid="alert-dialog-cancel" variant='contained' onClick={() => { onClose(null); }}>
          Cancel
        </Button>
        <Button id="alert-dialog-submit" data-testid="alert-dialog-submit" variant='contained' onClick={() => { onClose(x.current.value); }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InputAlert;
