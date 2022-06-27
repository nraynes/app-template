import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import { Box } from '@mui/system';
import { useColorPicker } from '@/stores/colorPickerStore';
import ColorPicker from './ColorPicker';
import TransparencySetter from './TransparencySetter';
import { myTheme } from '@/config/colors';
import { onMobile, backgroundOpacity, commonFormOpacity, buttonOpacity, buttonBarOpacity, titleBarOpacity, drawerOpacity, componentOpacity, touchConfig } from '@/config/config';
import { setCookie, clearCookie, getCookie } from '@/utils/browser/cookies';
import Button from './Button';

function ColorDrawer(props) {
  const { open, setClose } = useColorPicker();
  const customCookie = getCookie('customConfig');
  const [custom, setCustom] = useState(customCookie ? customCookie : {});
  const { XTolerance, YTolerance } = touchConfig.swipe
  const touchStartCoords = { x: 0, y: 0}
  const touchMoveCoords = { x: 0, y: 0}
  let stayedInPath = true;

  const changeColor = (rgba, key) => {
    myTheme[key].red = rgba.red;
    myTheme[key].green = rgba.green;
    myTheme[key].blue = rgba.blue;
  };

  const changeCustom = (key, value) => {
    const clone = {...custom};
    const newValue = value || 0.01
    clone[key] = newValue;
    setCustom(clone);
  }
  
  const applyColorTheme = () => {
    setCookie('theme', myTheme);
    setCookie('customConfig', custom);
    window.location.reload()
  }

  const resetColorTheme = () => {
    clearCookie('theme');
    clearCookie('customConfig');
    window.location.reload()
  }

  const renderColorPickers = () => (
    <>
      <ColorPicker
        id="secondary_two"
        label="Secondary 2"
        defaultRed={myTheme.secondaryTwo.red}
        defaultGreen={myTheme.secondaryTwo.green}
        defaultBlue={myTheme.secondaryTwo.blue}
        onChange={(rgba) => changeColor(rgba, 'secondaryTwo')}
      />
      <ColorPicker
        id="secondary_three"
        label="Secondary 3"
        defaultRed={myTheme.secondaryThree.red}
        defaultGreen={myTheme.secondaryThree.green}
        defaultBlue={myTheme.secondaryThree.blue}
        onChange={(rgba) => changeColor(rgba, 'secondaryThree')}
      />
    </>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={setClose}
    >
      <Box
        id="color_drawer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: ['100vw', '40em'],
          height: '100%',
          pb: '2em',
        }}
        onTouchStart={(e) => {
          touchStartCoords.x = e.touches[0].clientX
          touchStartCoords.y = e.touches[0].clientY
        }}
        onTouchMove={(e) => {
          touchMoveCoords.x = e.touches[0].clientX
          touchMoveCoords.y = e.touches[0].clientY
          if (Math.abs(touchStartCoords.y - touchMoveCoords.y) > YTolerance) {
            stayedInPath = false;
          }
        }}
        onTouchEnd={(e) => {
          if (stayedInPath && Math.abs(touchStartCoords.y - touchMoveCoords.y) < YTolerance) {
            const xDif = touchStartCoords.x - touchMoveCoords.x;
            if (xDif < 0 && Math.abs(xDif) > XTolerance) { // Swiped towards right
              setClose();
            }
          }
          touchStartCoords.x = 0
          touchStartCoords.y = 0
          touchMoveCoords.x = 0
          touchMoveCoords.y = 0
          stayedInPath = true;
        }}
      >
        <Box
          id="custom_theme_console"
          sx={{
            width: '100%',
            height: 'max-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            id="main_colors"
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
              pt: '1em',
              height: 'auto',
              transition: '1s ease',
            }}
          >
            <ColorPicker
              id="primary_one"
              label="Primary 1"
              defaultRed={myTheme.primaryOne.red}
              defaultGreen={myTheme.primaryOne.green}
              defaultBlue={myTheme.primaryOne.blue}
              onChange={(rgba) => changeColor(rgba, 'primaryOne')}
            />
            <ColorPicker
              id="primary_two"
              label="Primary 2"
              defaultRed={myTheme.primaryTwo.red}
              defaultGreen={myTheme.primaryTwo.green}
              defaultBlue={myTheme.primaryTwo.blue}
              onChange={(rgba) => changeColor(rgba, 'primaryTwo')}
            />
            <ColorPicker
              id="secondary_one"
              label="Secondary 1"
              defaultRed={myTheme.secondaryOne.red}
              defaultGreen={myTheme.secondaryOne.green}
              defaultBlue={myTheme.secondaryOne.blue}
              onChange={(rgba) => changeColor(rgba, 'secondaryOne')}
            />
            {!onMobile && renderColorPickers()}
          </Box>
          {onMobile && (
            <Box
              id="main_colors_second_row"
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '100%',
                pt: '1em',
                height: 'auto',
                transition: '1s ease',
              }}
            >
              {renderColorPickers()}
            </Box>
          )}
          <Box
            id="transparency_setters_one"
            sx={{
              mt: '2em',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-evenly',
            }}
          >
            <TransparencySetter defaultValue={backgroundOpacity * 100} label="Background Opacity" onChange={(e) => changeCustom('backgroundOpacity', (e.target.value / 100))} />
            <TransparencySetter defaultValue={commonFormOpacity * 100} label="Card Opacity" onChange={(e) => changeCustom('commonFormOpacity', (e.target.value / 100))} />
            <TransparencySetter defaultValue={buttonOpacity * 100} label="Button Opacity" onChange={(e) => changeCustom('buttonOpacity', (e.target.value / 100))} />
            {!onMobile && <TransparencySetter defaultValue={buttonBarOpacity * 100} label="Button Bar Opacity" onChange={(e) => changeCustom('buttonBarOpacity', (e.target.value / 100))} />}
          </Box>
          <Box
            id="transparency_setters_two"
            sx={{
              mt: '2em',
              display: 'flex',
              // flexDirection: onMobile ? 'column' : 'row',
              width: '100%',
              justifyContent: 'space-evenly',
            }}
          >
            <TransparencySetter orientation={onMobile ? 'vertical' : 'horizontal'} defaultValue={titleBarOpacity * 100} label="Title Bar Opacity" onChange={(e) => changeCustom('titleBarOpacity', (e.target.value / 100))} />
            <TransparencySetter orientation={onMobile ? 'vertical' : 'horizontal'} defaultValue={drawerOpacity * 100} label="Drawer Opacity" onChange={(e) => changeCustom('drawerOpacity', (e.target.value / 100))} />
            <TransparencySetter orientation={onMobile ? 'vertical' : 'horizontal'} defaultValue={componentOpacity * 100} label="Component Opacity" onChange={(e) => changeCustom('componentOpacity', (e.target.value / 100))} />
          </Box>
          {onMobile && (
            <Box
            id="transparency_setters_three"
            sx={{
              my: '2em',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-evenly',
            }}
          >
            <TransparencySetter orientation="horizontal" defaultValue={buttonBarOpacity * 100} label="Button Bar Opacity" onChange={(e) => changeCustom('buttonBarOpacity', (e.target.value / 100))} />
          </Box>
          )}
        </Box>
        <Box
          id="color_drawer_button_bar"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
            onClick={setClose}
          >
            Close
          </Button>
          <Button
            sx={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              ml: '1em',
            }}
            onClick={resetColorTheme}
          >
            Set Defaults
          </Button>
          <Button
            sx={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              ml: '1em',
            }}
            onClick={applyColorTheme}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default ColorDrawer;