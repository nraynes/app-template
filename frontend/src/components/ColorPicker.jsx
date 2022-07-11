import React, { useState, useRef } from 'react';
import { TextField, Menu, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';


function ColorPicker({
  defaultRed = 0,
  defaultGreen = 0,
  defaultBlue = 0,
  defaultAlpha = 1,
  showAlpha = false,
  label,
  onChange = () => {},
  id = `${(Math.random() * 100).toFixed(1)}`,
  ...args
}) {
  const redRef = useRef();
  const greenRef = useRef();
  const blueRef = useRef();
  const alphaRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const sliderColor = 'rgba(255,0,100)';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const defaultColors = {
    red: defaultRed,
    green: defaultGreen,
    blue: defaultBlue,
  }
  if (showAlpha) {
    defaultColors.alpha = defaultAlpha;
  }

  const [color, setColor] = useState(defaultColors);

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
    if (showAlpha) setAlphaMinMax(alphaRef);
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
    };
    if (showAlpha) {
      stateObj.alpha = getAlphaValue(alphaRef.current.value);
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
      id={id}
      sx={{
        transition: '0.5s',
      }}
      {...args}
    >
      <Box
        id={`color_box_${id}`}
        data-testid={`color_box_${id}`}
        aria-controls={open ? `color_menu_${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: `rgba(${color.red},${color.green},${color.blue}${showAlpha ? `,${color.alpha}` : ''})`,
          border: '2px solid black',
          borderRadius: '5em',
          width: '5em',
          height: '5em',
          transition: '0.5s',
          '&:hover': {
            cursor: 'pointer',
            width: '6em',
            height: '6em',
          },
        }}
      />
      {label && <Typography id={`color_box_${id}_label`} data-testid={`color_box_${id}_label`} sx={{ width: '100%', textAlign: 'center', height: '1em' }}>{label}</Typography>}
      <Menu
        id={`color_menu_${id}`}
        data-testid={`color_menu_${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box
          id={`color_menu_${id}_container`}
          data-testid={`color_menu_${id}_container`}
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
            id={`color_menu_${id}_red_slider`}
            data-testid={`color_menu_${id}_red_slider`}
            sx={pickerBoxSx}
          >
            <TextField id={`color_menu_${id}_red_slider_text`} data-testid={`color_menu_${id}_red_slider_text`} type="number" defaultValue={color.red} onChange={changeColor} inputRef={redRef} label="Red" sx={{ width: '5em' }} />
            <Slider id={`color_menu_${id}_red_slider_slider`} data-testid={`color_menu_${id}_red_slider_slider`} sx={{ mt: '1em', height: '10em', color: sliderColor }} orientation="vertical" defaultValue={(color.red / 255) * 100} value={(color.red / 255) * 100} onChange={(e) => sliderFunc(e, redRef)} />
          </Box>
          <Box
            id={`color_menu_${id}_green_slider`}
            data-testid={`color_menu_${id}_green_slider`}
            sx={{
              ...pickerBoxSx,
              ml: '0.5em',
            }}
          >
            <TextField id={`color_menu_${id}_green_slider_text`} data-testid={`color_menu_${id}_green_slider_text`} type="number" defaultValue={color.green} onChange={changeColor} inputRef={greenRef} label="Green" sx={{ width: '5em' }} />
            <Slider id={`color_menu_${id}_green_slider_slider`} data-testid={`color_menu_${id}_green_slider_slider`} sx={{ mt: '1em', height: '10em', color: sliderColor }} orientation="vertical" defaultValue={(color.green / 255) * 100} value={(color.green / 255) * 100} onChange={(e) => sliderFunc(e, greenRef)} />
          </Box>
          <Box
            id={`color_menu_${id}_blue_slider`}
            data-testid={`color_menu_${id}_blue_slider`}
            sx={{
              ...pickerBoxSx,
              ml: '0.5em',
            }}
          >
            <TextField id={`color_menu_${id}_blue_slider_text`} data-testid={`color_menu_${id}_blue_slider_text`} type="number" defaultValue={color.blue} onChange={changeColor} inputRef={blueRef} label="Blue" sx={{ width: '5em' }} />
            <Slider id={`color_menu_${id}_blue_slider_slider`} data-testid={`color_menu_${id}_blue_slider_slider`} sx={{ mt: '1em', height: '10em', color: sliderColor }} orientation="vertical" defaultValue={(color.blue / 255) * 100} value={(color.blue / 255) * 100} onChange={(e) => sliderFunc(e, blueRef)} />
          </Box>
          {showAlpha && (
            <Box
              id={`color_menu_${id}_alpha_slider`}
              data-testid={`color_menu_${id}_alpha_slider`}
              sx={{
                ...pickerBoxSx,
                ml: '0.5em',
              }}
            >
              <TextField id={`color_menu_${id}_alpha_slider_text`} data-testid={`color_menu_${id}_alpha_slider_text`} type="number" defaultValue={color.alpha} onChange={changeColor} inputRef={alphaRef} label="Alpha" sx={{ width: '5em' }} />
              <Slider id={`color_menu_${id}_alpha_slider_slider`} data-testid={`color_menu_${id}_alpha_slider_slider`} sx={{ mt: '1em', height: '10em', color: sliderColor }} orientation="vertical" defaultValue={color.alpha * 100} value={color.alpha * 100} onChange={(e) => sliderAlphaFunc(e, alphaRef)} />
            </Box>
          )}
        </Box>
      </Menu>
    </Box>
  );
}

export default ColorPicker;