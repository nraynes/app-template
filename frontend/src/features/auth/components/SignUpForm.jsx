import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@/components/TextField';
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
    <Box
      id="SignUpForm"
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
        <Typography sx={{ color: `rgba(${opposingColor})` }} variant="h6">Sign-Up</Typography>
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
          <TextField componentColor={componentColor} inputRef={emailRef} type="email" sx={{ width: '100%' }} />
        </Box>
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
          <TextField componentColor={componentColor} inputRef={confirmPasswordRef} type="password" sx={{ width: '100%' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            mt: '1em',
            mb: '0.5em',
          }}
        >
          <ReCAPTCHA
            sitekey="6LdRj6wfAAAAAERkJmkrP-303oEIuygoaSmgtgs9"
            nonce="{NONCE}"
            onChange={recaptchaLoadedCallback}
            onError={recaptchaErrorCallback}
            onExpired={recaptchaExpiredCallback}
          />
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
            sx={{ wordWrap: 'break-word', ml: '0.5em' }}
            onClick={logInButton}
          >Log-In</Button>
          <Button
            variant='contained'
            type="submit"
            sx={{ wordWrap: 'break-word', mr: '0.5em' }}
            onClick={signUpButton}
          >Sign-Up</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpForm;