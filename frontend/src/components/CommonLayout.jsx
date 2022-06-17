import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import { topBarHeight, bottomBarHeight, onMobile } from '@/config/config';
import MenuIcon from '@mui/icons-material/Menu';
import { consoleColor, drawerOpacity, backgroundColor } from '@/config/config'

// mobileDrawerHeaders needs to be the same length as children.
function CommonLayout({ children, useMobileDrawer, mobileDrawerHeaders }) {
  const [displayChild, setDisplayChild] = useState(0);
  const [open, setOpen] = useState(false);
  const componentColor = consoleColor
  const opposingColor = drawerOpacity > 0.5 ? componentColor.opposingText.main : backgroundColor.opposingText.main;
  
  return (
    <Box
      id='CommonLayout'
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: topBarHeight,
        minHeight: `calc(100vh - ${topBarHeight}${onMobile && useMobileDrawer ? ` - ${bottomBarHeight}` : ''})`,
        height: 'max-content',
        pb: onMobile && useMobileDrawer ? `calc(${bottomBarHeight} + ${topBarHeight})` : 0,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      {onMobile && useMobileDrawer
        ? (
          <>
            {children[displayChild]}
            <Box
              sx={{
                height: bottomBarHeight,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                position: 'fixed',
                bottom: 0,
                left: 0,
                backgroundColor: componentColor.type === 'dark' ? `rgba(${componentColor.dark}, ${drawerOpacity})` : `rgba(${componentColor.light}, ${drawerOpacity})`,
                boxShadow: '0px -0.3em 1em -0.2em',
                zIndex: 999,
              }}
            >
              <IconButton sx={{ width: 'max-content' }} onClick={() => setOpen(true)}><MenuIcon sx={{ color: `rgba(${opposingColor})`}} /></IconButton>
            </Box>
            <Drawer
              anchor="bottom"
              open={open}
              onClose={() => setOpen(false)}
              PaperProps={{
                sx: {
                  backgroundColor: `rgba(${componentColor.main}, ${drawerOpacity})`,
                }
              }}
            >
              <Box
                sx={{
                  my: '0.25em',
                }}
              >
                {mobileDrawerHeaders.map((header, i) => (
                  <Box
                    sx={{
                      mx: '1em',
                      my: '0.5em',
                    }}
                  >
                    <Button
                      variant='contained'
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '3em',
                        width: '100%',
                        borderRadius: '3em',
                      }}
                      onClick={() => {
                        setDisplayChild(i);
                        setOpen(false);
                      }}
                    >
                      {header}
                    </Button>
                  </Box>
                ))}
              </Box>
            </Drawer>
          </>
          )
        : children}
    </Box>
  );
}

export default CommonLayout;