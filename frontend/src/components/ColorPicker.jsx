import React, { useState, useRef } from 'react';
import { TextField, Menu, Slider } from '@mui/material';
import { Box } from '@mui/system';

function ColorPicker({ defaultRed = 0, defaultGreen = 0, defaultBlue = 0, defaultAlpha = 1, onChange = () => {}, id = `${(Math.random() * 100).toFixed(1)}` }) {
  const redRef = useRef();
  const greenRef = useRef();
  const blueRef = useRef();
  const alphaRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [color, setColor] = useState({
    red: defaultRed,
    green: defaultGreen,
    blue: defaultBlue,
    alpha: defaultAlpha,
  });

  const setMinMax = (ref) => {
    if (ref.current.value > 255) {
      ref.current.value = 255;
    } else if (ref.current.value < 0 || !(ref.current.value >= 0 && ref.current.value <= 255)) {
      ref.current.value = 0;
    }
  }

  const setAlphaMinMax = (ref) => {
    if (ref.current.value > 1) {
      ref.current.value = 1;
    } else if (ref.current.value < 0 || !(ref.current.value >= 0 && ref.current.value <= 1)) {
      ref.current.value = 0;
    }
  }

  const setNumberFields = () => {
    const fields = [
      redRef,
      greenRef,
      blueRef,
    ]
    for (let i = 0; i < fields.length; i++) {
      setMinMax(fields[i]);
    }
    setAlphaMinMax(alphaRef);
  }

  const getValue = (number) => {
    const num = parseInt(number);
    if (num >= 0 && num <= 255) {
      return num;
    }
    return 0;
  }

  const getAlphaValue = (number) => {
    const num = parseFloat(number);
    if (num >= 0 && num <= 1) {
      return num;
    }
    return 0;
  }

  const changeColor = () => {
    setNumberFields();
    const stateObj = {
      red: getValue(redRef.current.value),
      green: getValue(greenRef.current.value),
      blue: getValue(blueRef.current.value),
      alpha: getAlphaValue(alphaRef.current.value),
    };
    setColor(stateObj);
    onChange(stateObj);
  };

  const sliderFunc = (e, ref) => {
    const value = Math.floor((e.target.value / 100) * 255);
    ref.current.value = value;
    changeColor();
  };

  const sliderAlphaFunc = (e, ref) => {
    const value = ((e.target.value / 100) * 1).toFixed(2);
    ref.current.value = value;
    changeColor();
  };

  const pickerBoxSx = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        id={`color_box_${id}`}
        aria-controls={open ? `color_menu_${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: `rgba(${color.red},${color.green},${color.blue},${color.alpha})`,
          border: '2px solid black',
          borderRadius: '0.5em',
          width: '5em',
          height: '5em',
        }}
      />
      <Menu
        id={`color_menu_${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: 'max-content',
            height: 'max-content',
            mx: '0.5em',
            mt: '0.2em',
            mb: '1em',
          }}
        >
          <Box
            sx={pickerBoxSx}
          >
            <TextField type="number" defaultValue={color.red} onChange={changeColor} inputRef={redRef} label="Red" sx={{ width: '5em' }} />
            <Slider sx={{ mt: '1em', height: '10em' }} orientation="vertical" defaultValue={(color.red / 255) * 100} value={(color.red / 255) * 100} onChange={(e) => sliderFunc(e, redRef)} />
          </Box>
          <Box
            sx={{
              ...pickerBoxSx,
              ml: '0.5em',
            }}
          >
            <TextField type="number" defaultValue={color.green} onChange={changeColor} inputRef={greenRef} label="Green" sx={{ width: '5em' }} />
            <Slider sx={{ mt: '1em', height: '10em' }} orientation="vertical" defaultValue={(color.green / 255) * 100} value={(color.green / 255) * 100} onChange={(e) => sliderFunc(e, greenRef)} />
          </Box>
          <Box
            sx={{
              ...pickerBoxSx,
              ml: '0.5em',
            }}
          >
            <TextField type="number" defaultValue={color.blue} onChange={changeColor} inputRef={blueRef} label="Blue" sx={{ width: '5em' }} />
            <Slider sx={{ mt: '1em', height: '10em' }} orientation="vertical" defaultValue={(color.blue / 255) * 100} value={(color.blue / 255) * 100} onChange={(e) => sliderFunc(e, blueRef)} />
          </Box>
          <Box
            sx={{
              ...pickerBoxSx,
              ml: '0.5em',
            }}
          >
            <TextField type="number" defaultValue={color.alpha} onChange={changeColor} inputRef={alphaRef} label="Alpha" sx={{ width: '5em' }} />
            <Slider sx={{ mt: '1em', height: '10em' }} orientation="vertical" defaultValue={color.alpha * 100} value={color.alpha * 100} onChange={(e) => sliderAlphaFunc(e, alphaRef)} />
          </Box>
        </Box>
      </Menu>
    </Box>
  );
}

export default ColorPicker;