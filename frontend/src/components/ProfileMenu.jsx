import React from 'react';
import { Box, Typography, Menu, MenuItem, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '@/lib/auth';
import useButtons from '@/stores/topBarButtons';

function ProfileMenu({
  handleClose,
  anchorEl,
  menuOpen,
  profileButton,
  settingsButton,
  helpButton,
  logOutButton,
}) {
  const { buttons } = useButtons();
  const auth = useAuth();
  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'profile-button',
      }}
    >
      {(auth.user && auth.user.email) && (
        <>
          <Box
            id="mini_profile_container"
          >
            <Typography sx={{ mx: '1em', my: '0.5em', fontStyle: 'italic' }}>{auth.user.email}</Typography>
          </Box>
          <Divider sx={{ mb: '0.5em' }} />
        </>
      )}
      {(buttons.profile && auth.user) && <MenuItem onClick={() => {
        profileButton()
        handleClose()
      }}><PersonIcon sx={{ mr: '0.5em' }} />Profile</MenuItem>}
      {(buttons.settings && auth.user) && <MenuItem onClick={() => {
        settingsButton()
        handleClose()
      }}><SettingsIcon sx={{ mr: '0.5em' }} />Settings</MenuItem>}
      {(buttons.help && auth.user) && <MenuItem onClick={() => {
        helpButton()
        handleClose()
      }}><HelpIcon sx={{ mr: '0.5em' }} />Help</MenuItem>}
      {(buttons.logOut && auth.user) && <MenuItem onClick={() => {
        logOutButton()
        handleClose()
      }}><LogoutIcon sx={{ mr: '0.5em' }} />Log-Out</MenuItem>}
    </Menu>
  );
}

export default ProfileMenu;