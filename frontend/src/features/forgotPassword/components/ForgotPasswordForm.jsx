import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@/components/TextField';
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
    <Box
      id="LogInForm"
      component="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        boxShadow: '0 0 1rem 0 rgba(255, 255, 255, .3)',
        borderRadius: '1em',
        maxWidth: '100vw',
        margin: '1em',
        animation: 'fade-in-from-center 0.66s',
        backgroundColor: `rgba(${commonFormColor.main}, ${commonFormOpacity})`,
      }}
    >
      <Box
        sx={{
          borderBottom: `2px solid rgba(${opposingColor})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'max-content',
          py: '0.3em'
        }}
      >
        <Typography sx={{ color: `rgba(${opposingColor})` }} variant="h6">Forgot Password</Typography>
      </Box>
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
          <TextField componentColor={componentColor} inputRef={emailRef} type="email" sx={{ width: ['100%', '20em'] }} />
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
    </Box>
  );
}

export default ForgotPasswordForm;