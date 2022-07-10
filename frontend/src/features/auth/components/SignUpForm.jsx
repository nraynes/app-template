import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@/components/TextField';
import Card from '@/components/Card';
import CardHead from '@/components/CardHead';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from '@/lib/auth';
import { useSnackbar } from 'notistack';
import { commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';

function SignUpForm(props) {
  const navigate = useNavigate();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [captcha, setCaptcha] = useState('');
  const logInButton = () => {
    navigate('/auth/login')
  };

  const signUpButton = () => {
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      auth.register({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        captcha,
      })
    } else {
      enqueueSnackbar('Passwords must match.', { variant: 'error' });
    }
  };

  const recaptchaLoadedCallback = (response) => {
    setCaptcha(response)
  };

  const recaptchaErrorCallback = () => {
    enqueueSnackbar('There was an error verifying CAPTCHA.', { variant: 'error' });
  };

  const recaptchaExpiredCallback = () => {
    enqueueSnackbar('CAPTCHA has expired!', { variant: 'warning' });
  };

  return (
    <Card
      id="signup-form"
      data-testid="signup-form"
      component="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <CardHead id="signup-form-header" data-testid="signup-form-header">Sign-Up</CardHead>
      <Box
        id="signup-form-inputs-container"
        data-testid="signup-form-inputs-container"
        sx={{
          margin: '1em',
        }}
      >
        <Box
          id="signup-email-container"
          data-testid="signup-email-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography id="signup-email-label" data-testid="signup-email-label" sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Email:</Typography>
          <TextField id="signup-email-input" data-testid="signup-email-input" componentColor={componentColor} inputRef={emailRef} type="email" sx={{ width: '100%' }} />
        </Box>
        <Box
          id="signup-password-container"
          data-testid="signup-password-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography id="signup-password-label" data-testid="signup-password-label" sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Password:</Typography>
          <TextField id="signup-password-input" data-testid="signup-password-input" componentColor={componentColor} inputRef={passwordRef} type="password" sx={{ width: '100%' }} />
        </Box>
        <Box
          id="signup-confirm-password-container"
          data-testid="signup-confirm-password-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography id="signup-confirm-password-label" data-testid="signup-confirm-password-label" sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Confirm Password:</Typography>
          <TextField id="signup-confirm-password-input" data-testid="signup-confirm-password-input" componentColor={componentColor} inputRef={confirmPasswordRef} type="password" sx={{ width: '100%' }} />
        </Box>
        <Box
          id="signup-recaptcha-container"
          data-testid="signup-recaptcha-container"
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            mt: '1em',
            mb: '0.5em',
          }}
        >
          <ReCAPTCHA
            id="google-recaptcha"
            data-testid="google-recaptcha"
            sitekey="6LdiG3wgAAAAAAVmWDo1FLx4NEZWi2TycAXEJdNr"
            nonce="{NONCE}"
            onChange={recaptchaLoadedCallback}
            onError={recaptchaErrorCallback}
            onExpired={recaptchaExpiredCallback}
          />
        </Box>
        <Box
          id="signup-form-actions"
          data-testid="signup-form-actions"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            py: '0.5em',
          }}
        >
          <Button
            id="signup-form-login-button"
            data-testid="signup-form-login-button"
            variant='contained'
            sx={{ wordWrap: 'break-word', ml: '0.5em' }}
            onClick={logInButton}
          >Log-In</Button>
          <Button
            id="signup-form-signup-button"
            data-testid="signup-form-signup-button"
            variant='contained'
            type="submit"
            sx={{ wordWrap: 'break-word', mr: '0.5em' }}
            onClick={signUpButton}
          >Sign-Up</Button>
        </Box>
      </Box>
    </Card>
  );
}

export default SignUpForm;