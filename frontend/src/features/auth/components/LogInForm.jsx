import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Card from '@/components/Card';
import CardHead from '@/components/CardHead';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';
import { gaEventHandler } from '@/utils/misc/analytics';

function LogInForm() {
  const gaEventTracker = gaEventHandler('Login Form');
  const navigate = useNavigate();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const auth = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const forgotPasswordButton = () => {
    navigate('/password/forgot');
  };

  const signUpButton = () => {
    navigate('/auth/signup');
  };

  const logInButton = async () => {
    gaEventTracker('Login button clicked', 'Attempt to log in made');
    await auth.login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <Card
      id="login-form"
      data-testid="login-form"
      component="form"
      onSubmit={(e)=>e.preventDefault()}
    >
      <CardHead id="login-form-header" data-testid="login-form-header">Log-In</CardHead>
      <Box
        id="login-form-inputs-container"
        data-testid="login-form-inputs-container"
        sx={{
          margin: '1em',
        }}
      >
        <Box
          id="login-email-container"
          data-testid="login-email-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography id="login-email-label" data-testid="login-email-label" sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Email:</Typography>
          <TextField id="login-email-input" data-testid="login-email-input" componentColor={componentColor} type="email" inputRef={emailRef} sx={{ width: '100%' }} />
        </Box>
        <Box
          id="login-password-container"
          data-testid="login-password-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography id="login-password-label" data-testid="login-password-label" sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Password:</Typography>
          <TextField id="login-password-input" data-testid="login-password-input" componentColor={componentColor} type="password" inputRef={passwordRef} sx={{ width: '100%' }} />
        </Box>
        <Box
          id="login-form-actions"
          data-testid="login-form-actions"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            py: '0.5em',
          }}
        >
          <Button
            id="login-form-forgot-password-button"
            data-testid="login-form-forgot-password-button"
            variant='contained'
            sx={{ wordWrap: 'break-word', mr: '0.5em' }}
            onClick={forgotPasswordButton}
          >Forgot Password</Button>
          <Button
            id="login-form-signup-button"
            data-testid="login-form-signup-button"
            variant='contained'
            sx={{ wordWrap: 'break-word', mx: '0.5em' }}
            onClick={signUpButton}
          >Sign-Up</Button>
          <Button
            id="login-form-login-button"
            data-testid="login-form-login-button"
            variant='contained'
            type='submit'
            sx={{ wordWrap: 'break-word', ml: '0.5em' }}
            onClick={logInButton}
          >Log-In</Button>
        </Box>
      </Box>
    </Card>
  );
}

export default LogInForm;