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
import { commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';
import apiCall from '@/utils/core/apiCall';

function ProfileEditor(props) {
  const { enqueueSnackbar } = useSnackbar();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const { ask } = useAskAlert();
  const auth = useAuth();
  const { data, refetch } = useQuery('profileInfo', () => (
    apiCall(() => getProfileInfo(), {
      SUCCESS: response => response,
      NOTFOUND: "We couldn't find the account.",
      UNAUTHORIZED: 'You were not authorized to view account info.',
    }, false)
  ));
  const [editing, setEditing] = useState(false);
  const emailRef = useRef();

  const deleteAccountButton = () => {
    ask('Confirm', 'Are you sure you want to delete your account?', async (answer) => {
      if (answer) {
        await apiCall(() => deleteUser(), {
          SUCCESS: () => {
            enqueueSnackbar("Successfully deleted user account. You will now be logged out.", { variant: 'success', onClose: auth.logout })
          },
          UNAUTHORIZED: 'You are not authorized to delete this account.',
          NOTFOUND: "We couldn't find the account.",
        })
      }
    })
  }

  const editAccountButton = async () => {
    if (!editing) {
      setEditing(true);
    } else {
      const editInfo = async () => {
        await apiCall(() => editProfileInfo(emailRef.current.value), {
          SUCCESS: () => {
            enqueueSnackbar("Info changed successfully!", { variant: 'success' })
            if (changingEmail) {
              enqueueSnackbar("Please check your email to reverify it. You will now be logged out.", { variant: 'info', onClose: auth.logout })
            }
          },
          ALREADYEXISTS: 'There is already a user with that information.',
          NOTFOUND: "We couldn't find the account.",
          UNAUTHORIZED: 'You are not authorized to edit account information.',
        })
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
        await apiCall(() => logOutOfAllDevices(), {
          SUCCESS: () => {
            enqueueSnackbar("Successfully logged out of all devices. You will now be logged out.", { variant: 'success', onClose: auth.logout })
          },
        }, false)
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