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
      data-testid="change-password"
      component="form"
    >
      <CardHead id="change-password-header" data-testid="change-password-header">Change Password</CardHead>
      <Box
        id="change-password-inputs-container"
        data-testid="change-password-inputs-container"
        sx={{
          margin: '1em',
        }}
      >
        <Box
          id="change-password-password-container"
          data-testid="change-password-password-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography id="change-password-password-label" data-testid="change-password-password-label" sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Password:</Typography>
          <TextField id="change-password-password-input" data-testid="change-password-password-input" componentColor={componentColor} inputRef={passwordRef} type="password" sx={{ width: '100%' }} />
        </Box>
        <Box
          id="change-password-confirm-password-container"
          data-testid="change-password-confirm-password-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography id="change-password-confirm-password-label" data-testid="change-password-confirm-password-label" sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Confirm Password:</Typography>
          <TextField id="change-password-confirm-password-input" data-testid="change-password-confirm-password-input" componentColor={componentColor} inputRef={confirmPasswordRef} type="password" sx={{ width: ['100%', '20em'] }} />
        </Box>
        <Box
          id="change-password-form-actions"
          data-testid="change-password-form-actions"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            py: '0.5em',
          }}
        >
          <Button
            id="change-password-form-cancel-button"
            data-testid="change-password-form-cancel-button"
            variant='contained'
            sx={{ wordWrap: 'break-word', mr: '0.5em' }}
            onClick={cancelButton}
          >Cancel</Button>
          <Button
            id="change-password-form-change-password-button"
            data-testid="change-password-form-change-password-button"
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