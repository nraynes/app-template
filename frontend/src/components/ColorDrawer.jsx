import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import { Box } from '@mui/system';
import { useColorPicker } from '@/stores/colorPickerStore';
import ColorPicker from './ColorPicker';
import { myTheme } from '@/config/colors';
// import * as config from '@/config/config';
import { setCookie, clearCookie } from '@/utils/browser/cookies';
import Button from './Button';

function ColorDrawer(props) {
  const { open, setClose } = useColorPicker();
  const [configuration, setConfiguration] = useState(2);

  const changePrimaryOneColor = (rgba) => {
    myTheme.primaryOne.red = rgba.red;
    myTheme.primaryOne.green = rgba.green;
    myTheme.primaryOne.blue = rgba.blue;
  };

  const changePrimaryTwoColor = (rgba) => {
    myTheme.primaryTwo.red = rgba.red;
    myTheme.primaryTwo.green = rgba.green;
    myTheme.primaryTwo.blue = rgba.blue;
  };

  const changeSecondaryOneColor = (rgba) => {
    myTheme.secondaryOne.red = rgba.red;
    myTheme.secondaryOne.green = rgba.green;
    myTheme.secondaryOne.blue = rgba.blue;
  };

  const changeSecondaryTwoColor = (rgba) => {
    myTheme.secondaryTwo.red = rgba.red;
    myTheme.secondaryTwo.green = rgba.green;
    myTheme.secondaryTwo.blue = rgba.blue;
  };

  const changeSecondaryThreeColor = (rgba) => {
    myTheme.secondaryThree.red = rgba.red;
    myTheme.secondaryThree.green = rgba.green;
    myTheme.secondaryThree.blue = rgba.blue;
  };
  
  const applyColorTheme = () => {
    setCookie('theme', myTheme);
    window.location.reload()
  }

  const resetColorTheme = () => {
    clearCookie('theme');
    window.location.reload()
  }

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
          width: '40em',
          height: '100%',
        }}
      >
        {configuration === 1
          ? (
            <Box
              id="main_colors_wheel"
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '16em',
                height: '16em',
                mt: '2em',
                position: 'relative',
              }}
            >
              <ColorPicker
                id="primary_one"
                label="Primary 1"
                type={2}
                sx={{
                  position: 'absolute',
                  top: '-0.972em',
                  left: '0.797em',
                }}
                defaultRed={myTheme.primaryOne.red}
                defaultGreen={myTheme.primaryOne.green}
                defaultBlue={myTheme.primaryOne.blue}
                onChange={(rgba) => changePrimaryOneColor(rgba)}
              />
              <ColorPicker
                id="primary_two"
                label="Primary 2"
                type={2}
                sx={{
                  position: 'absolute',
                  top: '-0.972em',
                  right: '0.797em',
                }}
                defaultRed={myTheme.primaryTwo.red}
                defaultGreen={myTheme.primaryTwo.green}
                defaultBlue={myTheme.primaryTwo.blue}
                onChange={(rgba) => changePrimaryTwoColor(rgba)}
              />
              <ColorPicker
                id="secondary_one"
                label="Secondary 1"
                type={2}
                sx={{
                  position: 'absolute',
                  bottom: '3.02em',
                  right: '-2.108em',
                }}
                defaultRed={myTheme.secondaryOne.red}
                defaultGreen={myTheme.secondaryOne.green}
                defaultBlue={myTheme.secondaryOne.blue}
                onChange={(rgba) => changeSecondaryOneColor(rgba)}
              />
              <ColorPicker
                id="secondary_two"
                label="Secondary 2"
                type={2}
                sx={{
                  position: 'absolute',
                  bottom: '-2.5em',
                  left: '5.5em',
                }}
                defaultRed={myTheme.secondaryTwo.red}
                defaultGreen={myTheme.secondaryTwo.green}
                defaultBlue={myTheme.secondaryTwo.blue}
                onChange={(rgba) => changeSecondaryTwoColor(rgba)}
              />
              <ColorPicker
                id="secondary_three"
                label="Secondary 3"
                type={2}
                sx={{
                  position: 'absolute',
                  bottom: '3.02em',
                  left: '-2.108em',
                }}
                defaultRed={myTheme.secondaryThree.red}
                defaultGreen={myTheme.secondaryThree.green}
                defaultBlue={myTheme.secondaryThree.blue}
                onChange={(rgba) => changeSecondaryThreeColor(rgba)}
              />
            </Box>
          )
          : (
            <Box
              id="main_colors_box"
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '100%',
                pt: '1em',
              }}
            >
              <ColorPicker
                id="primary_one"
                label="Primary 1"
                defaultRed={myTheme.primaryOne.red}
                defaultGreen={myTheme.primaryOne.green}
                defaultBlue={myTheme.primaryOne.blue}
                onChange={(rgba) => changePrimaryOneColor(rgba)}
              />
              <ColorPicker
                id="primary_two"
                label="Primary 2"
                defaultRed={myTheme.primaryTwo.red}
                defaultGreen={myTheme.primaryTwo.green}
                defaultBlue={myTheme.primaryTwo.blue}
                onChange={(rgba) => changePrimaryTwoColor(rgba)}
              />
              <ColorPicker
                id="secondary_one"
                label="Secondary 1"
                defaultRed={myTheme.secondaryOne.red}
                defaultGreen={myTheme.secondaryOne.green}
                defaultBlue={myTheme.secondaryOne.blue}
                onChange={(rgba) => changeSecondaryOneColor(rgba)}
              />
              <ColorPicker
                id="secondary_two"
                label="Secondary 2"
                defaultRed={myTheme.secondaryTwo.red}
                defaultGreen={myTheme.secondaryTwo.green}
                defaultBlue={myTheme.secondaryTwo.blue}
                onChange={(rgba) => changeSecondaryTwoColor(rgba)}
              />
              <ColorPicker
                id="secondary_three"
                label="Secondary 3"
                defaultRed={myTheme.secondaryThree.red}
                defaultGreen={myTheme.secondaryThree.green}
                defaultBlue={myTheme.secondaryThree.blue}
                onChange={(rgba) => changeSecondaryThreeColor(rgba)}
              />
            </Box>
          )}
        <Box
          sx={{
            display: 'flex',
            mb: '1em',
          }}
        >
          <Button
            sx={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
            onClick={setClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              ml: '1em',
            }}
            onClick={resetColorTheme}
          >
            Reset Color Theme
          </Button>
          <Button
            sx={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              ml: '1em',
            }}
            onClick={applyColorTheme}
          >
            Apply Color Theme
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default ColorDrawer;