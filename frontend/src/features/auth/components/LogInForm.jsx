import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Card from '@/components/Card';
import CardHead from '@/components/CardHead';
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
    <Card
      id="LogInForm"
      component="form"
      onSubmit={(e)=>e.preventDefault()}
    >
      <CardHead>Log-In</CardHead>
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
    </Card>
  );
}

export default LogInForm;