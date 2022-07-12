import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography } from '@mui/material';
import Button from './Button';
import { commonFormColor } from '@/config/config';
import encode from '@/utils/core/encode';

const FileDialogue = ({ onClose, title, message, ...args }) => {
  const [file, setFile] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClose(true);
      setFile([]);
    }
  };

  return (
    <Dialog
      id="alert-dialog"
      data-testid="alert-dialog"
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
        <Typography variant="h5" component="p">{title}</Typography>
      </DialogTitle>
      <DialogContent id="alert-dialog-description" data-testid="alert-dialog-description">
        <Typography style={{ whiteSpace: 'pre-line', marginBottom: '1em' }}>{message}</Typography>
        <input id="fileinput" data-testid="fileinput" accept=".jpg,.png" type="file" onChange={(e) => {
          encode(e.target.files[0], setFile);
        }} />
      </DialogContent>
      <DialogActions
        id="alert-dialog-actions"
        data-testid="alert-dialog-actions"
      >
        <Button
          id="alert-dialog-cancel"
          data-testid="alert-dialog-cancel"
          onClick={() => { onClose(null); }}
        >
          Cancel
        </Button>
        <Button
          id="alert-dialog-submit"
          data-testid="alert-dialog-submit"
          onClick={() => {
            onClose(file);
            setFile(null);
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileDialogue;
