import React from 'react';
import { Menu, MenuItem, Box, Typography } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import formatDate from '@/utils/formatters/format';
import { consoleColor, notificationsOpacity, backgroundColor } from '@/config/config';
import '@/styles/menu.css';

function NotificationMenu({ anchorEl, open, handleClose, data }) {
  const componentColor = consoleColor;
  const opposingColor = notificationsOpacity > 0.5 ? componentColor.opposingText.main : backgroundColor.opposingText.main;

  return (
    <Menu
      id="notifications-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'notifications-button',
        id: 'notifications-menu-container',
        sx: {
          p: 0,
          color: `rgba(${opposingColor})`,
          maxHeight: '50vh',
        }
      }}
    >
      {data && Array.isArray(data) && data.length > 0 ? data.map((notification) => (
        <MenuItem
          sx={{
            backgroundColor: `rgba(${componentColor.main}, ${notificationsOpacity})`,
            color: `rgba(${opposingColor})`,
            '&:hover': {
              backgroundColor: `rgba(${componentColor.main}, ${notificationsOpacity})`,
              color: `rgba(${opposingColor})`,
            },
            height: 'max-content',
            maxWidth: '25em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography sx={{ color: `rgba(${opposingColor})`, textDecoration: 'underline', whiteSpace: 'pre-wrap' }}>{`Sent on: ${formatDate(new Date(notification.sent_on))}`}</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{notification.message}</Typography>
            {!notification.read_on && <PriorityHighIcon />}
          </Box>
          {notification.read_on && <Typography sx={{ fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>{`Read on: ${formatDate(new Date(notification.read_on))}`}</Typography>}
        </MenuItem>
      )) : (
        <MenuItem
          sx={{
            backgroundColor: `rgba(${componentColor.main}, ${notificationsOpacity})`,
            color: `rgba(${opposingColor})`,
            '&:hover': {
              backgroundColor: `rgba(${componentColor.main}, ${notificationsOpacity})`,
              color: `rgba(${opposingColor})`,
            },
            height: 'max-content',
            maxWidth: '25em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography sx={{ color: `rgba(${opposingColor})` }}>Nothing to see here!</Typography>
        </MenuItem>
      )}
    </Menu>
  );
}

export default NotificationMenu;