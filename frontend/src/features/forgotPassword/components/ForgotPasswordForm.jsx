import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@/components/TextField';
import Card from '@/components/Card';
import CardHead from '@/components/CardHead';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import sendPasswordReset from '@/features/forgotPassword/api/sendEmail';
import { commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';
import apiCall from '@/utils/core/apiCall';
import { useSnackbar } from 'notistack';

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const emailRef = useRef();
  const { enqueueSnackbar } = useSnackbar();


  const backButton = () => {
    navigate('/auth/login');
  };

  const resetPasswordButton = async () => {
    await apiCall(() => sendPasswordReset(emailRef.current.value), {
      SUCCESS: 'If an account with this email exists, you will receive an email to reset your password.',
      NOTFOUND: () => enqueueSnackbar('If an account with this email exists, you will receive an email to reset your password.', { variant: 'success' }),
    });
  };

  return (
    <Card
      id="forgot-password"
      data-testid="forgot-password"
      component="form"
      onSubmit={(e) => e.preventDefault()}
      type={2}
    >
      <CardHead id="forgot-password-header" data-testid="forgot-password-header">Forgot Password</CardHead>
      <Box
        id="forgot-password-inputs-container"
        sx={{
          margin: '1em',
        }}
      >
        <Box
          id="forgot-password-email-container"
          data-testid="forgot-password-email-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography id="forgot-password-email-label" data-testid="forgot-password-email-label" sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Email:</Typography>
          <TextField id="forgot-password-email-input" data-testid="forgot-password-email-input" componentColor={componentColor} inputRef={emailRef} type="email" sx={{ width: '100%' }} />
        </Box>
        <Box
          id="forgot-password-form-actions"
          data-testid="forgot-password-form-actions"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            py: '0.5em',
          }}
        >
          <Button
            id="forgot-password-form-back-button"
            data-testid="forgot-password-form-back-button"
            variant='contained'
            sx={{ wordWrap: 'break-word', mr: '0.5em' }}
            onClick={backButton}
          >Back</Button>
          <Button
            id="forgot-password-form-reset-password-button"
            data-testid="forgot-password-form-reset-password-button"
            variant='contained'
            type="submit"
            sx={{ wordWrap: 'break-word', ml: '0.5em' }}
            onClick={resetPasswordButton}
          >Reset Password</Button>
        </Box>
      </Box>
    </Card>
  );
}

export default ForgotPasswordForm;