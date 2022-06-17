import React, { useRef, useState } from 'react';
import '@/styles/fadeIn.css';
import { Box, Typography, MenuItem } from '@mui/material';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import { useAuth } from '@/lib/auth';
import { useQuery } from 'react-query';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSnackbar } from 'notistack';
import generateJoiError from '@/utils/formatters/generateJoiError';
import getCategories from '@/features/admin/api/getCategories';
import addPost from '@/features/postWall/api/addPost';
import checkPost from '@/features/postWall/api/checkPost';
import { useAskAlert } from '@/stores/askAlertStore';
import DisplayPosts from './DisplayPosts';
import { onMobile, commonFormColor, commonFormOpacity, backgroundColor } from '@/config/config';
import { useAwaiting } from '@/stores/awaitingStore';

function PostsConsole({ postData, isPreviousData, refetchPostData, amounts, page, setPage, setPageAmount, searchRef, usernameRef, setCategoryRef, likesRef, rightPageButton, leftPageButton }) {
  const auth = useAuth();
  const { ask } = useAskAlert();
  const { nowAwaiting, notAwaiting } = useAwaiting();
  const opposingColor = commonFormOpacity > 0.5 ? commonFormColor.opposingText.main : backgroundColor.opposingText.main;
  const componentColor = commonFormOpacity > 0.5 ? commonFormColor : backgroundColor;
  const newPostRef = useRef();
  const [categoryID, setCategoryID] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery('getCategories', async () => {
    const response = await getCategories();
    if (response === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (response === 'UNAUTHORIZED') {
      enqueueSnackbar('You were not authorized to view the categories.', { variant: 'error' })
    } else if (response === 'FAILURE') {
      enqueueSnackbar('There was a problem retrieving your categories.', { variant: 'error' })
    } else if (response.details) {
      generateJoiError(response.details, enqueueSnackbar);
    } else {
      return response;
    }
    return null;
  });

  const handleSubmit = async () => {
    const postContent = newPostRef.current.value
    const postIt = async () => {
      const response = await addPost(postContent, categoryID);
      if (response === 'ASYNCERROR') {
        enqueueSnackbar('The server could not process the request.', { variant: 'error' })
      } else if (response === 'UNAUTHORIZED') {
        enqueueSnackbar('You need to login to post something!', { variant: 'error' })
      } else if (response === 'NOCAT') {
        enqueueSnackbar('Please choose a category for your post.', { variant: 'error' })
      } else if (response === 'FAILURE') {
        enqueueSnackbar('There was a problem posting your idea.', { variant: 'error' })
      } else if (response.details) {
        generateJoiError(response.details, enqueueSnackbar);
      } else {
        enqueueSnackbar('Successfully posted idea!', { variant: 'success' })
        newPostRef.current.value = '';
        refetchPostData();
      }
    }
    nowAwaiting();
    const responseForCheck = await checkPost(postContent);
    notAwaiting();
    if (responseForCheck === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (responseForCheck === 'UNAUTHORIZED') {
      enqueueSnackbar('You need to login to post something!', { variant: 'error' })
    } else if (responseForCheck === 'TOOLARGE') {
      enqueueSnackbar('Your post is too similar to many other posts out there.', { variant: 'error' })
    } else if (responseForCheck === 'FAILURE') {
      enqueueSnackbar('There was a problem checking for similar posts.', { variant: 'error' })
    } else if (responseForCheck.details) {
      generateJoiError(responseForCheck.details, enqueueSnackbar);
    } else if (responseForCheck === 'NOTFOUND') {
      postIt();
    } else {
      // Display a list of the similar posts
      ask('Similar Posts', 'Your post is very similar to some of these other posts, check these out to make sure someone else hasnt already thought of your idea, if you like the idea then search for it and leave a like! Do you still want to post this idea?', (answer) => {
        if (answer) {
          postIt();
        }
      }, true, <DisplayPosts posts={responseForCheck} />)
    }
  }

  const amountChange = (e) => {
    setPageAmount(e.target.value);
  }

  return (
    <Box
      id="Posts-Console"
      sx={{
        boxShadow: '0 0 1rem 0 rgba(255, 255, 255, .3)',
        textAlign: 'center',
        width: [['75%', '90%'], ['max-content', '50em']],
        borderRadius: '1em',
        maxWidth: '100vw',
        margin: '1em',
        animation: onMobile ? 'fade-in-from-center 0.66s' : 'fade-in-from-right 0.5s',
        backgroundColor: `rgba(${commonFormColor.main}, ${commonFormOpacity})`,
      }}
    >
      {auth.user && (
        <Box
          sx={{
            width: '100%'
          }}
          id="PostBox"
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
            <Typography sx={{ color: `rgba(${opposingColor})` }} variant="h6">Post Something</Typography>
          </Box>
          <Box
            sx={{
              px: '1em',
              mt: '1em',
            }}
          >
            <TextField
              componentColor={componentColor}
              label="Submit a new idea"
              sx={{
                width: '100%',
              }}
              rows={4}
              multiline
              inputRef={newPostRef}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: '0.5em',
              }}
            >
              <TextField
                componentColor={componentColor}
                select
                label="Idea Category"
                sx={{
                  width: ['100%', '15em'],
                  mr: '1em',
                }}
                onChange={(e) => {
                  setCategoryID(e.target.value)
                }}
              >
                {(data && Array.isArray(data)) && data.map((item, i) => (
                  <MenuItem sx={{ textAlign: 'center' }} key={i} value={item.category_id}>{item.category}</MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                sx={{
                  height: 'max-content',
                  width: 'max-content',
                  px: '2em'
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        id="SearchBox"
        sx={{
          borderBottom: `2px solid rgba(${opposingColor})`,
          mb: '1em'
        }}
      >
        <Box
          sx={{
            borderBottom: `2px solid rgba(${opposingColor})`,
            borderTop: auth.user && `2px solid rgba(${opposingColor})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'max-content',
            py: '0.3em',
            mt: auth.user && '1em',
            mb: '1em',
          }}
        >
          <Typography sx={{ color: `rgba(${opposingColor})` }} variant="h6">Search</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: '1em',
            mb: '1em',
          }}
        >
          <TextField
            componentColor={componentColor}
            label="Search"
            inputRef={searchRef}
            onChange={refetchPostData}
            sx={{
              mb: '0.25em'
            }}
          />
          <TextField
            componentColor={componentColor}
            label="Username"
            inputRef={usernameRef}
            onChange={refetchPostData}
            sx={{
              my: '0.25em'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: '0.25em',
            }}
          >
            <TextField
              componentColor={componentColor}
              sx={{
                width: ['100%', '15em'],
                mr: '1em',
              }}
              select
              onChange={(e) => {
                setCategoryRef(e.target.value)
              }}
              label="Idea Category"
            >
              {(data && Array.isArray(data)) && data.map((item, i) => (
                <MenuItem sx={{ textAlign: 'center' }} key={i} value={item.category_id}>{item.category}</MenuItem>
              ))}
            </TextField>
            <TextField
              componentColor={componentColor}
              label="Likes"
              type="number"
              inputRef={likesRef}
              onChange={refetchPostData}
            />
          </Box>
        </Box>
      </Box>
      <Box
        id="PageBox"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 'max-content',
          pb: '1em',
          px: '1em',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <IconButton disabled={page <= 1} onClick={leftPageButton} sx={{ width: 'max-content', color: `rgba(${opposingColor})` }}><ChevronLeftIcon /></IconButton>
          <IconButton disabled={isPreviousData || !postData?.hasMore} onClick={rightPageButton} sx={{ width: 'max-content', color: `rgba(${opposingColor})` }}><ChevronRightIcon /></IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Typography sx={{ mr: '0.4em', color: `rgba(${opposingColor})` }}>Amount:</Typography>
          <TextField
            componentColor={componentColor}
            select
            onChange={amountChange}
            defaultValue={amounts[0]}
          >
            {amounts.map((item) => (
              <MenuItem sx={{ textAlign: 'center' }} key={item} value={item}>{item}</MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  );
}

export default PostsConsole;