import React from 'react';
import { IconButton as GoogleIconButton, Tooltip } from '@mui/material';

function IconButton({ children, description, ...args }) {

  const returnButton = () => (
    <GoogleIconButton
      {...args}
    >
      {children}
    </GoogleIconButton>
  );

  return description ? (
    <Tooltip title={description}>
      {returnButton()}
    </Tooltip>
  ) : returnButton();
}

export default IconButton;