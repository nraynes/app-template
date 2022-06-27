import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@/components/TextField';
import Card from '@/components/Card';
import CardHead from '@/components/CardHead';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import changePassword from '@/features/forgotPassword/api/changePassword';
import deleteKey from '@/features/forgotPassword/api/deleteKey';
import { useSnackbar } from 'notistack';
import { commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';
import apiCall from '@/utils/core/apiCall';

function ChangePasswordForm({ accountID, code }) {
  const navigate = useNavigate();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const cancelButton = () => {
    navigate('/auth/login')
  };

  const changePasswordButton = async () => {
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      apiCall(() => changePassword(accountID, passwordRef.current.value), {
        SUCCESS: () => {
          deleteKey(code);
          enqueueSnackbar('Password successfully changed.', { variant: 'success' });
          navigate('/auth/login');
        }
      })
    } else {
      enqueueSnackbar('Passwords must match.', { variant: 'error' });
    }
  };

  return (
    <Card
      id="change-password"
      component="form"
    >
      <CardHead id="change-password-header">Change Password</CardHead>
      <Box
        id="change-password-header"
        sx={{
          margin: '1em',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Password:</Typography>
          <TextField componentColor={componentColor} inputRef={passwordRef} type="password" sx={{ width: '100%' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Confirm Password:</Typography>
          <TextField componentColor={componentColor} inputRef={confirmPasswordRef} type="password" sx={{ width: ['100%', '20em'] }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            py: '0.5em',
          }}
        >
          <Button
            variant='contained'
            sx={{ wordWrap: 'break-word', mr: '0.5em' }}
            onClick={cancelButton}
          >Cancel</Button>
          <Button
            variant='contained'
            sx={{ wordWrap: 'break-word', ml: '0.5em' }}
            onClick={changePasswordButton}
          >Change Password</Button>
        </Box>
      </Box>
    </Card>
  );
}

export default ChangePasswordForm;