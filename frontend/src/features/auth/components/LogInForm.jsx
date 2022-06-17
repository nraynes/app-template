import React, { useRef } from 'react';
import '@/styles/fadeIn.css';
import { Box, Typography } from '@mui/material';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';

function LogInForm(props) {
  const navigate = useNavigate();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const auth = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const forgotPasswordButton = () => {
    navigate('/password/forgot')
  };

  const signUpButton = () => {
    navigate('/auth/signup')
  };

  const logInButton = async () => {
    await auth.login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    window.refetchNotifications();
  };

  return (
    <Box
      id="LogInForm"
      component="form"
      onSubmit={(e)=>e.preventDefault()}
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
          borderBottom: `s2px solid rgba(${opposingColor})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'max-content',
          py: '0.3em'
        }}
      >
        <Typography sx={{ color: `rgba(${opposingColor})` }} variant="h6">Log-In</Typography>
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
          <TextField componentColor={componentColor} type="email" inputRef={emailRef} sx={{ width: '100%' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '0.5em',
          }}
        >
          <Typography sx={{ mr: '0.5em', color: `rgba(${opposingColor})` }}>Password:</Typography>
          <TextField componentColor={componentColor} type="password" inputRef={passwordRef} sx={{ width: '100%' }} />
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
            onClick={forgotPasswordButton}
          >Forgot Password</Button>
          <Button
            variant='contained'
            sx={{ wordWrap: 'break-word', mx: '0.5em' }}
            onClick={signUpButton}
          >Sign-Up</Button>
          <Button
            variant='contained'
            type='submit'
            sx={{ wordWrap: 'break-word', ml: '0.5em' }}
            onClick={logInButton}
          >Log-In</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LogInForm;