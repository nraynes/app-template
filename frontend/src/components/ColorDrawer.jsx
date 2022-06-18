import React from 'react';
import { Drawer } from '@mui/material';
import { Box } from '@mui/system';
import { useColorPicker } from '@/stores/colorPickerStore';
import ColorPicker from './ColorPicker';

function ColorDrawer(props) {
  const { open, setClose } = useColorPicker();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={setClose}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '30em',
          pt: '1em',
        }}
      >
        <ColorPicker id="primary_one" />
        <ColorPicker id="primary_two" />
        <ColorPicker id="secondary_one" />
        <ColorPicker id="secondary_two" />
        <ColorPicker id="secondary_three" />
      </Box>
    </Drawer>
  );
}

export default ColorDrawer;