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

  const menulist = [];

  if (auth.user && auth.user.email) {
    menulist.push((
      <Box
        id="mini_profile_arch_container"
        data-testid="mini_profile_arch_container"
        key="mini_profile_arch_container"
      >
        <Box
          id="mini_profile_container"
          data-testid="mini_profile_container"
        >
          <Typography id="profile-email" data-testid="profile-email" sx={{ mx: '1em', my: '0.5em', fontStyle: 'italic' }}>{auth.user.email}</Typography>
        </Box>
        <Divider id="profile-divider" data-testid="profile-divider" sx={{ mb: '0.5em' }} />
      </Box>
    ))
  }
  if (buttons.profile && auth.user) {
    menulist.push((<MenuItem id="profile-menu-profile" data-testid="profile-menu-profile" key="profile-menu-profile" onClick={() => {
      profileButton()
      handleClose()
    }}><PersonIcon sx={{ mr: '0.5em' }} />Profile</MenuItem>))
  }
  if (buttons.settings && auth.user) {
    menulist.push((<MenuItem id="profile-menu-settings" data-testid="profile-menu-settings" key="profile-menu-settings" onClick={() => {
      settingsButton()
      handleClose()
    }}><SettingsIcon sx={{ mr: '0.5em' }} />Settings</MenuItem>))
  }
  if (buttons.help && auth.user) {
    menulist.push((<MenuItem id="profile-menu-help" data-testid="profile-menu-help" key="profile-menu-help" onClick={() => {
      helpButton()
      handleClose()
    }}><HelpIcon sx={{ mr: '0.5em' }} />Help</MenuItem>))
  }
  if (buttons.logOut && auth.user) {
    menulist.push((<MenuItem id="profile-menu-logout" data-testid="profile-menu-logout" key="profile-menu-logout" onClick={() => {
      logOutButton()
      handleClose()
    }}><LogoutIcon sx={{ mr: '0.5em' }} />Log-Out</MenuItem>))
  }

  return (
    <Menu
      id="profile-menu"
      data-testid="profile-menu"
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'profile-button',
      }}
    >
      {menulist.map((item) => item)}
    </Menu>
  );
}

export default ProfileMenu;