/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import { useQuery  } from 'react-query';
import { useAuth } from '@/lib/auth';
import { useSnackbar } from 'notistack';
import { useAskAlert } from '@/stores/askAlertStore';
import getProfileInfo from '@/features/profile/api/getProfileInfo';
import logOutOfAllDevices from '@/features/profile/api/allLogOut';
import editProfileInfo from '@/features/profile/api/editProfileInfo';
import deleteUser from '@/features/profile/api/deleteUser';
import generateJoiError from '@/utils/formatters/generateJoiError';
import { commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';

function ProfileEditor(props) {
  const { enqueueSnackbar } = useSnackbar();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const { ask } = useAskAlert();
  const auth = useAuth();
  const { data, refetch } = useQuery('profileInfo', async () => {
    const response = await getProfileInfo();
    if (response === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (response === 'UNAUTHORIZED') {
      enqueueSnackbar('You were not authorized to view account info.', { variant: 'error' })
    } else if (response === 'FAILURE') {
      enqueueSnackbar('There was a problem retrieving your info.', { variant: 'error' })
    } else if (response === 'NOTFOUND') {
      enqueueSnackbar("We couldn't find the account.", { variant: 'error' })
    } else if (response.details) {
      generateJoiError(response.details, enqueueSnackbar);
    } else {
      return response;
    }
    return null;
  });
  const [editing, setEditing] = useState(false);
  const emailRef = useRef();

  const deleteAccountButton = () => {
    ask('Confirm', 'Are you sure you want to delete your account?', async (answer) => {
      if (answer) {
        const response = await deleteUser();
        if (response === 'ASYNCERROR') {
          enqueueSnackbar("The server could not process the request.", { variant: 'error' })
        } else if (response === 'FAILURE') {
          enqueueSnackbar("There was a problem deleting the account.", { variant: 'error' })
        } else if (response === 'NOTFOUND') {
          enqueueSnackbar("We couldn't find the account.", { variant: 'error' })
        } else if (response === 'UNAUTHORIZED') {
          enqueueSnackbar("You are not authorized to delete this account.", { variant: 'error' })
        } else if (response.details) {
          generateJoiError(response.details, enqueueSnackbar);
        } else {
          enqueueSnackbar("Successfully deleted user account. You will now be logged out.", { variant: 'success', onClose: auth.logout })
        }
      }
    })
  }

  const editAccountButton = async () => {
    if (!editing) {
      setEditing(true);
    } else {
      const editInfo = async () => {
        const response = await editProfileInfo(
          emailRef.current.value,
        );
        if (response === 'ASYNCERROR') {
          enqueueSnackbar("The server could not process the request.", { variant: 'error' })
        } else if (response === 'FAILURE') {
          enqueueSnackbar("There was a problem updating the information.", { variant: 'error' })
        } else if (response === 'ALREADYEXISTS') {
          enqueueSnackbar("There is already a user with that information. Please use a unique username and email.", { variant: 'error' })
        } else if (response === 'NOTFOUND') {
          enqueueSnackbar("We couldn't find the account.", { variant: 'error' })
        } else if (response === 'UNAUTHORIZED') {
          enqueueSnackbar("You are not authorized to edit account information.", { variant: 'error' })
        } else if (response.details) {
          generateJoiError(response.details, enqueueSnackbar);
        } else {
          enqueueSnackbar("Info changed successfully!", { variant: 'success' })
          if (changingEmail) {
            enqueueSnackbar("Please check your email to reverify it. You will now be logged out.", { variant: 'info', onClose: auth.logout })
          }
        }
        refetch();
        setEditing(false);
      }
      const changingEmail = emailRef.current.value !== (data && data.email);
      if (changingEmail) {
        ask('Re-verify', 'If you change your email, you will need to reverify it. You will recieve an email to the new email to verify your account.', (answer) => {
          if (answer) {
            editInfo();
          }
        })
      } else {
        await editInfo();
      }
    }
  }

  const cancelButton = () => {
    setEditing(false)
  }

  const allLogOutButton = () => {
    ask('Are you sure?', 'Are you sure you want to log out of all of your devices?', async (answer) => {
      if (answer) {
        const response = await logOutOfAllDevices();
        if (response === 'ASYNCERROR') {
          enqueueSnackbar('The server could not process the request.', { variant: 'error' })
        } else if (response === 'UNAUTHORIZED') {
          enqueueSnackbar('You were not authorized to log out of all devices.', { variant: 'error' })
        } else if (response === 'FAILURE') {
          enqueueSnackbar('There was a problem logging out of all your devices.', { variant: 'error' })
        } else if (response.details) {
          generateJoiError(response.details, enqueueSnackbar);
        } else {
          enqueueSnackbar("Successfully logged out of all devices. You will now be logged out.", { variant: 'success', onClose: auth.logout })
        }
      }
    })
  }

  return (
    <Box
      id="ProfileEditor"
      component="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        boxShadow: '0 0 1rem 0 rgba(255, 255, 255, .3)',
        borderRadius: '1em',
        maxWidth: '100vw',
        margin: '1em',
        width: [['75%', '90%'], ['max-content', '30em']],
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
        <Typography sx={{ color: `rgba(${opposingColor})` }} variant="h6">Profile</Typography>
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
          <Typography sx={{ color: `rgba(${opposingColor})`, mr: '0.5em' }}>Email:</Typography>
          <TextField componentColor={componentColor} value={(data && !editing) ? data.email : undefined} disabled={!editing} inputRef={emailRef} type="email" sx={{ width: '100%' }} />
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
            sx={{ wordWrap: 'break-word', mr: '0.5em', width: '100%' }}
            onClick={deleteAccountButton}
          >Delete Account</Button>
          <Button
            variant='contained'
            type="submit"
            sx={{ wordWrap: 'break-word', ml: '0.5em', width: 'max-content' }}
            onClick={editAccountButton}
          >{editing ? 'Submit' : 'Edit'}</Button>
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
            sx={{ wordWrap: 'break-word', mr: editing && '0.5em', width: '100%' }}
            onClick={allLogOutButton}
          >Log out of all devices</Button>
          {editing && <Button
            variant='contained'
            type="submit"
            sx={{ wordWrap: 'break-word', ml: '0.5em', width: 'max-content' }}
            onClick={cancelButton}
          >Cancel</Button>}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileEditor;