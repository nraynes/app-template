/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import IconButton from '@/components/IconButton';
import { useNavigate } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GavelIcon from '@mui/icons-material/Gavel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import useButtons from '@/stores/topBarButtons';
import { topBarHeight } from '@/config/config';
import { useAuth } from '@/lib/auth';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import generateJoiError from '@/utils/formatters/generateJoiError';
import getNotifications from '@/api/getNotifications';
import readNotifications from '@/api/readNotifications';
import NotificationMenu from './NotificationMenu';
import { backgroundColor, consoleColor, buttonBarOpacity, titleBarOpacity } from '@/config/config';
import '@/styles/topbar.css';
import '@/styles/fadeIn.css';

function TopBar(props) {
  const componentColor = consoleColor
  const opposingColor = buttonBarOpacity > 0.5 ? componentColor.opposingText.main : backgroundColor.opposingText.main;
  const { buttons } = useButtons();
  const navigate = useNavigate();
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { data, refetch } = useQuery('getNotifications', async () => {
    const response = await getNotifications();
    if (response === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (response === 'FAILURE') {
      enqueueSnackbar('There was a problem retrieving your notifications.', { variant: 'error' })
    } else if (response.details) {
      generateJoiError(response.details, enqueueSnackbar);
    } else {
      return response;
    }
    return null;
  })
  window.refetchNotifications = refetch;
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(data && Array.isArray(data) && data.some((item) => !item.read_on));
  const open = Boolean(anchorEl);
  const [buttonAmount, setButtonAmount] = useState(0);

  const getButtonAmount = () => {
    let amount = 0;
    if (buttons.terms) amount++
    if (buttons.notifications && auth.user) amount++
    if (buttons.adminDash && auth.user && auth.user.is_admin) amount++
    if (buttons.profile && auth.user) amount++
    if (buttons.home) amount++
    if (buttons.logIn && !auth.user) amount++
    if (buttons.logOut && auth.user) amount++
    return amount;
  }

  useEffect(() => {
    setButtonAmount(getButtonAmount())
    setUnreadNotifications(data && Array.isArray(data) ? data.some((item) => !item.read_on): false);
  }, [data])

  const notificationsButton = (event) => {
    const readNot = async () => {
      if (unreadNotifications) {
        const response = await readNotifications(data ? data.reduce((acc, item) => {
          console.log(item)
          if (!item.read_on) {
            acc.push(item.notification_id)
          }
          return acc;
        }, []) : [])
        if (response === 'ASYNCERROR') {
          enqueueSnackbar('The server could not process the request.', { variant: 'error' })
        } else if (response === 'UNAUTHORIZED') {
          enqueueSnackbar('You were not authorized to update these notifications read status.', { variant: 'error' })
        } else if (response === 'FAILURE') {
          enqueueSnackbar('There was a problem updating your notifications to read status.', { variant: 'error' })
        } else if (response.details) {
          generateJoiError(response.details, enqueueSnackbar);
        }
      }
    }
    readNot();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    refetch();
    setAnchorEl(null);
  };

  const adminDashButton = () => {
    refetch();
    navigate('/admin/dashboard');
  };

  const profileButton = () => {
    refetch();
    navigate('/user/profile');
  };

  const homeButton = () => {
    refetch();
    navigate('/');
  };

  const logInButton = () => {
    navigate('/auth/login');
  };

  const logOutButton = () => {
    auth.logout();
    navigate('/');
  };

  const termsButton = () => {
    navigate('/service/terms');
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
        >Ellsworth Idea Bin</Typography>
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
          {buttons.terms && <IconButton sx={topBarIconSX} description="Terms of Service" onClick={termsButton}><GavelIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
          {(buttons.notifications && auth.user) && (
            <>
              <IconButton
                sx={topBarIconSX}
                onClick={notificationsButton}
                description="Notifications"
                id="notifications-button"
                aria-controls={open ? 'notifications-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >{!unreadNotifications
                ? <NotificationsIcon sx={{ color: `rgba(${opposingColor})` }} />
                : <NotificationImportantIcon sx={{ color: `red`, animation: 'fade-in-and-out 2s infinite alternate' }} />}</IconButton>
              <NotificationMenu anchorEl={anchorEl} open={open} handleClose={handleClose} data={data} />
            </>
          )
          }
          {(buttons.adminDash && auth.user && auth.user.is_admin) && <IconButton sx={topBarIconSX} description="Admin Dashboard" onClick={adminDashButton}><SpeedIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
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