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

function ForgotPasswordForm(props) {
  const navigate = useNavigate();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const emailRef = useRef();


  const backButton = () => {
    navigate('/auth/login')
  };

  const resetPasswordButton = async () => {
    await apiCall(() => sendPasswordReset(emailRef.current.value), {
      SUCCESS: 'If an account with this email exists, you will receive an email to reset your password.',
      NOTFOUND: 'If an account with this email exists, you will receive an email to reset your password.',
    });
  };

  return (
    <Card
      id="LogInForm"
      component="form"
      onSubmit={(e) => e.preventDefault()}
      type={2}
    >
      <CardHead>Forgot Password</CardHead>
      <Box
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
          <Typography sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Email:</Typography>
          <TextField componentColor={componentColor} inputRef={emailRef} type="email" sx={{ width: '100%' }} />
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
            onClick={backButton}
          >Back</Button>
          <Button
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