/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import '@/styles/fadeIn.css';
import { Box, Typography, Button } from '@mui/material';
import TextField from '@/components/TextField';
import IconButton from '@/components/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FlagIcon from '@mui/icons-material/Flag';
import UndoIcon from '@mui/icons-material/Undo';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useAuth } from '@/lib/auth';
import { useSnackbar } from 'notistack';
import generateJoiError from '@/utils/formatters/generateJoiError';
import likePost from '@/features/postWall/api/likePost';
import unlikePost from '@/features/postWall/api/unlikePost';
import reportPost from '@/features/postWall/api/reportPost';
import unreportPost from '@/features/postWall/api/unreportPost';
import unflagPost from '@/features/postWall/api/unflagPost';
import deletePost from '@/features/postWall/api/deletePost';
import editPost from '@/features/postWall/api/editPost';
import { useAskAlert } from '@/stores/askAlertStore';
import { showGlow, postColor, postOpacity, backgroundColor, backgroundImageCode, postFrostedGlassEffect, postFrostLevel } from '@/config/config'
import '@/styles/background.css';
import '@/styles/glow.css';

function Post({ post, refetch, sx, indexKey }) {
  const [viewing, setViewing] = useState(false);
  const [editing, setEditing] = useState(false);
  const editPostRef = useRef();
  const auth = useAuth();
  const { ask } = useAskAlert();
  const { enqueueSnackbar } = useSnackbar();
  const [isVisible, setVisible] = useState(true);
  const componentColor = postColor;
  const opposingColor = postOpacity > 0.5 ? componentColor.opposingText.main : backgroundColor.opposingText.main;
  const canEdit = (auth.user && (auth.user.account_id === post.account_id || auth.user.is_admin))
  const isMine = (auth.user && (auth.user.account_id === post.account_id))
  const randomTimer = (Math.random() + 0.5).toFixed(2)

  useEffect(() => {  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    const element = document.getElementById(`Post_${indexKey}`);
    if (element) {
      observer.observe(element);
      return () => observer.unobserve(element)
    }
  }, []);
  
  const likeButton = async (post_id, unlike) => {
    let response;
    if (unlike) {
      response = await unlikePost(post_id);
    } else {
      response = await likePost(post_id);
    }
    if (response === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (response === 'UNAUTHORIZED') {
      enqueueSnackbar('You need to login to like a post.', { variant: 'error' })
    } else if (response === 'FAILURE') {
      enqueueSnackbar('There was a problem liking the post.', { variant: 'error' })
    } else if (response.details) {
      generateJoiError(response.details, enqueueSnackbar);
    } else {
      refetch();
    }
  }

  const reportButton = async (post_id, unreport) => {
    let response;
    if (unreport) {
      response = await unreportPost(post_id);
    } else {
      response = await reportPost(post_id);
    }
    if (response === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (response === 'UNAUTHORIZED') {
      enqueueSnackbar('You need to login to report a post.', { variant: 'error' })
    } else if (response === 'FAILURE') {
      enqueueSnackbar('There was a problem reporting the post.', { variant: 'error' })
    } else if (response.details) {
      generateJoiError(response.details, enqueueSnackbar);
    } else {
      refetch();
    }
  }

  const unflagButton = async () => {
    const response = await unflagPost(post.post_id);
    if (response === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (response === 'UNAUTHORIZED') {
      enqueueSnackbar('You need to login to unflag a post.', { variant: 'error' })
    } else if (response === 'FAILURE') {
      enqueueSnackbar('There was a problem unflagging the post.', { variant: 'error' })
    } else if (response.details) {
      generateJoiError(response.details, enqueueSnackbar);
    } else {
      refetch();
    }
  }

  const submitEditButton = async () => {
    const response = await editPost(post.post_id, editPostRef.current.value);
    if (response === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (response === 'UNAUTHORIZED') {
      enqueueSnackbar('You need to login to edit a post.', { variant: 'error' })
    } else if (response === 'FAILURE') {
      enqueueSnackbar('There was a problem editing the post.', { variant: 'error' })
    } else if (response === 'NOTFOUND') {
      enqueueSnackbar('We could not find this post.', { variant: 'error' })
    } else if (response === 'FORBIDDEN') {
      enqueueSnackbar('You are not allowed to edit this post.', { variant: 'error' })
    } else if (response.details) {
      generateJoiError(response.details, enqueueSnackbar);
    } else {
      enqueueSnackbar('Edited post successfully!', { variant: 'success' })
      setEditing(false);
      refetch();
    }
  }

  const deleteButton = () => {
    ask('Confirm', 'Are you sure you want to delete this post?', async (answer) => {
      if (answer) {
        const response = await deletePost(post.post_id);
        if (response === 'ASYNCERROR') {
          enqueueSnackbar('The server could not process the request.', { variant: 'error' })
        } else if (response === 'UNAUTHORIZED') {
          enqueueSnackbar('You need to login to delete a post.', { variant: 'error' })
        } else if (response === 'FAILURE') {
          enqueueSnackbar('There was a problem deleting the post.', { variant: 'error' })
        } else if (response === 'NOTFOUND') {
          enqueueSnackbar('We could not find this post.', { variant: 'error' })
        } else if (response === 'FORBIDDEN') {
          enqueueSnackbar('You are not allowed to delete this post.', { variant: 'error' })
        } else if (response.details) {
          generateJoiError(response.details, enqueueSnackbar);
        } else {
          enqueueSnackbar('Deleted post successfully!', { variant: 'success' })
          refetch();
        }
      }
    })
  }

  const expandContactInfo = () => {
    setViewing(!viewing)
  }

  return (
    <Box
      id={`Post_Wrapper_${indexKey}`}
      sx={{
        zIndex: 1,
        position: 'relative',
        borderRadius: '1em',
        maxWidth: '90vw',
        width: '90%',
        height: 'max-content',
        overflow: 'hidden',
        boxShadow: (!isMine || !showGlow) && '0 0 1rem 0 rgba(0, 0, 0, .2)',
        animation: showGlow && (isMine && `glow ${randomTimer}s infinite alternate;`)
      }}
    >
      <Box
        id={`Post_Backdrop_${indexKey}`}
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        sx={{
          zIndex: 0,
          background: postFrostedGlassEffect && backgroundImageCode,
          backgroundColor: `rgba(${componentColor.main}, ${postOpacity})`,
          position: 'absolute',
          borderRadius: '1em',
          width: '100%',
          height: '100%',
          filter: postFrostedGlassEffect && `blur(${postFrostLevel}px)`,
          boxShadow: `inset 0 0 0 3000px rgba(255,255,255,0.3)`,
          ...sx,
        }}
      ></Box>
      <Box
        id={`Post_${indexKey}`}
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        sx={{
          zIndex: 1,
          borderRadius: '1em',
          width: '100%',
          height: '100%',
          ...sx,
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button variant="string" sx={{ textTransform: 'none', textAlign: 'center', borderRadius: '0.5em', p: '0.1em', width: '100%' }} onClick={expandContactInfo}><Typography sx={{ color: `rgba(${postOpacity > 0.5 ? opposingColor : backgroundColor.opposingText.main})` }}>{post.username}</Typography></Button>
          {viewing && post.email && <Typography sx={{ color: `rgba(${opposingColor})` }}>{post.email}</Typography>}
          {viewing && post.phone_number && <Typography sx={{ color: `rgba(${opposingColor})` }}>{post.phone_number}</Typography>}
          <Typography sx={{ color: `rgba(${opposingColor})`, fontStyle: 'italic', fontSize: '0.8em' }}>{post.category}</Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '10em',
            overflow: 'scroll',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {editing ? <TextField componentColor={componentColor} inputRef={editPostRef} multiline rows={5} defaultValue={post.post_content} sx={{ width: '95%', whiteSpace: 'pre-wrap' }} /> : <Typography sx={{ color: `rgba(${opposingColor})`, width: '95%', whiteSpace: 'pre-wrap' }}>{post.post_content}</Typography>}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: '0.5em',
            }}
          >
            <Typography sx={{ color: `rgba(${opposingColor})` }}>{post.likes}</Typography>
            {auth.user && post.liked ? <IconButton onClick={() => likeButton(post.post_id, true)}><ThumbDownIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton> : <IconButton onClick={() => likeButton(post.post_id)}><ThumbUpIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
            {auth.user && (post.reported ? <IconButton description="Undo report" onClick={() => reportButton(post.post_id, true)}><UndoIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton> : <IconButton description="Report post for inappropriate content" onClick={() => reportButton(post.post_id)}><FlagIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>)}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: '0.5em',
            }}
          >
            {(auth.user && auth.user.is_admin && post.flagged) && <IconButton description="Unflag Post" onClick={unflagButton}><EmojiFlagsIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
            {canEdit && (
              <>
                {editing && <IconButton description="Submit" onClick={submitEditButton}><DoneIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
                {editing ? <IconButton description="Cancel" onClick={() => setEditing(false)}><CancelIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton> : <IconButton description="Edit Post" onClick={() => setEditing(true)}><EditIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>}
                <IconButton description="Delete Post" onClick={deleteButton}><DeleteIcon sx={{ color: `rgba(${opposingColor})` }} /></IconButton>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Post;