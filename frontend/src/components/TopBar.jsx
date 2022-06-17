/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import IconButton from '@/components/IconButton';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import useButtons from '@/stores/topBarButtons';
import { topBarHeight } from '@/config/config';
import { useAuth } from '@/lib/auth';
import { backgroundColor, consoleColor, buttonBarOpacity, titleBarOpacity } from '@/config/config';

function TopBar(props) {
  const componentColor = consoleColor
  const opposingColor = buttonBarOpacity > 0.5 ? componentColor.opposingText.main : backgroundColor.opposingText.main;
  const { buttons } = useButtons();
  const navigate = useNavigate();
  const auth = useAuth();
  const [buttonAmount, setButtonAmount] = useState(0);

  const getButtonAmount = () => {
    let amount = 0;
    if (buttons.profile && auth.user) amount++
    if (buttons.home) amount++
    if (buttons.logIn && !auth.user) amount++
    if (buttons.logOut && auth.user) amount++
    return amount;
  }

  useEffect(() => {
    setButtonAmount(getButtonAmount())
  }, [])

  const profileButton = () => {
    navigate('/user/profile');
  };

  const homeButton = () => {
    navigate('/');
  };

  const logInButton = () => {
    navigate('/auth/login');
  };

  const logOutButton = () => {
    auth.logout();
    navigate('/');
  };

  const topBarIconSX = {
    width: [`${100 / buttonAmount}%`, 'max-content'],
  };

  return (
    <Box
      id="TopBar"
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: topBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        id="AppTitle"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          background: titleBarOpacity && `linear-gradient(to right, rgba(${componentColor.main}, ${titleBarOpacity}) 0%, rgba(${componentColor.main}, ${titleBarOpacity}) 75%, rgba(${componentColor.main}, 0) 100%)`,
          pr: titleBarOpacity && ['2em', '5em'],
          width: '25em',
          maxWidth: '50%',
          borderBottom: `2px solid rgba(${backgroundColor.opposingText.main})`,
          animation: 'slide-in-from-left 0.75s',
        }}
      >
        <Typography
          variant='h5'
          component="h1"
          sx={{
            mr: '1em',
            textAlign: 'center',
            fontSize: ['1.2em', '1.5em'],
            color: titleBarOpacity >= 0.5 ? `rgba(${opposingColor})` : `rgba(${backgroundColor.opposingText.main})`,
          }}
        >App Template</Typography>
      </Box>
      <Box
        id="ButtonBar"
        sx={{
          width: ['max-content', '100%'],
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            width: 'max-content',
            pl: ['2em', '5em'],
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'slide-in-from-right 0.75s',
            background: `linear-gradient(to left, rgba(${componentColor.main}, ${buttonBarOpacity}) 0%, rgba(${componentColor.main}, ${buttonBarOpacity}) 75%, rgba(${componentColor.main}, 0) 100%)`,
          }}
        >
          {(buttons.profile && auth.user) && <IconButton sx={topBarIconSX} description="Profile" onClick={profileButton}><PersonIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
          {buttons.home && <IconButton sx={topBarIconSX} description="Home" onClick={homeButton}><HomeIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
          {(buttons.logIn && !auth.user) && <IconButton sx={topBarIconSX} description="Log-in" onClick={logInButton}><LoginIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
          {(buttons.logOut && auth.user) && <IconButton sx={topBarIconSX} description="Log-out" onClick={logOutButton}><LogoutIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
        </Box>
      </Box>
    </Box>
  );
}

export default TopBar;