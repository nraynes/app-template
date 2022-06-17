import React from 'react';
import '@/styles/fadeIn.css';
import { Box } from '@mui/material';
import Post from './Post';
import { topBarHeight, onMobile, touchConfig } from '@/config/config';

function PostsContainer({ posts, refetch, rightPageButton, leftPageButton }) {
  const { XTolerance, YTolerance } = touchConfig.swipe
  const touchStartCoords = { x: 0, y: 0}
  const touchMoveCoords = { x: 0, y: 0}
  let stayedInPath = true;
  return (
    <Box
      id="Posts-Container"
      onTouchStart={(e) => {
        touchStartCoords.x = e.touches[0].clientX
        touchStartCoords.y = e.touches[0].clientY
      }}
      onTouchMove={(e) => {
        touchMoveCoords.x = e.touches[0].clientX
        touchMoveCoords.y = e.touches[0].clientY
        if (Math.abs(touchStartCoords.y - touchMoveCoords.y) > YTolerance) {
          stayedInPath = false;
        }
      }}
      onTouchEnd={(e) => {
        if (stayedInPath && Math.abs(touchStartCoords.y - touchMoveCoords.y) < YTolerance) {
          const xDif = touchStartCoords.x - touchMoveCoords.x;
          if (xDif > XTolerance) { // Swiped towards left
            rightPageButton()
          } else if (xDif < 0 && Math.abs(xDif) > XTolerance) { // Swiped towards right
            leftPageButton()
          }
        }
        touchStartCoords.x = 0
        touchStartCoords.y = 0
        touchMoveCoords.x = 0
        touchMoveCoords.y = 0
        stayedInPath = true;
      }}
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: ['100%', '50% 50%'],
        height: !onMobile && `calc(100vh - (${topBarHeight} + 1em))`,
        overflow: !onMobile && 'scroll',
        animation: 'fade-in-from-center 0.66s',
      }}
    >
      {posts && posts.map((post, i) => {
        const id = `${Math.floor(Math.random() * 100000)}_${i}`;
        return (
          <Box
            id={`Post_${id}`}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1em',
            }}
          >
            <Post
              indexKey={id}
              post={post}
              refetch={refetch}
            />
          </Box>
        )
      })}
    </Box>
  );
}

export default PostsContainer;