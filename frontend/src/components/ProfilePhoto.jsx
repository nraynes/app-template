import React from 'react';
import { Box } from '@mui/system';
import { Tooltip } from '@mui/material';
import Picture from '@/components/Picture';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function ProfilePhoto({
  callback,
  photo,
  id,
  ...args
}) {
  const renderBox = () => (
    <Box
      id={id}
      data-testid={id}
      onClick={callback}
      sx={{
        width: '5em',
        height: '5em',
        borderRadius: '2.5em',
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        '&:hover': {
          cursor: callback ? 'pointer' : 'default'
        }
      }}
      {...args}
    >
      {photo ? <Picture id={`${id}_img`} data-testid={`${id}_img`} style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }} src={photo}/> : <InsertPhotoIcon />}
    </Box>
  );
  return callback ? (
    <Tooltip title="Edit Profile Photo">
      {renderBox()}
    </Tooltip>
  ) : renderBox();
}

export default ProfilePhoto;