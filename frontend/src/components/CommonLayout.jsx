import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import { topBarHeight, bottomBarHeight, onMobile } from '@/config/config';
import MenuIcon from '@mui/icons-material/Menu';
import { consoleColor, drawerOpacity, backgroundColor } from '@/config/config';

// mobileDrawerHeaders needs to be the same length as children.
function CommonLayout({ children, useMobileDrawer, mobileDrawerHeaders }) {
  const [displayChild, setDisplayChild] = useState(0);
  const [open, setOpen] = useState(false);
  const componentColor = consoleColor;
  const opposingColor = drawerOpacity > 0.5 ? componentColor.opposingText.main : backgroundColor.opposingText.main;
  
  return (
    <Box
      id='common_layout'
      data-testid='common_layout'
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
              id="drawer_menu"
              data-testid="drawer_menu"
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
              <IconButton id="drawer_menu_icon_button" data-testid="drawer_menu_icon_button" sx={{ width: 'max-content' }} onClick={() => setOpen(true)}><MenuIcon sx={{ color: `rgba(${opposingColor})`}} /></IconButton>
            </Box>
            <Drawer
              id="page_drawer_container"
              data-testid="page_drawer_container"
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
                id="page_drawer"
                data-testid="page_drawer"
                sx={{
                  my: '0.25em',
                }}
              >
                {mobileDrawerHeaders.map((header, i) => (
                  <Box
                    id={`drawer_box_${i}`}
                    data-testid={`drawer_box_${i}`}
                    key={`drawer_box_${i}`}
                    sx={{
                      mx: '1em',
                      my: '0.5em',
                    }}
                  >
                    <Button
                      id={`drawer_button_${i}`}
                      data-testid={`drawer_button_${i}`}
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