import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostWallPage from './PostWall';
import { useButtons } from '@/stores/topBarButtons';
import compareObjects from '@/utils/core/compareObjects';

function RootRoutes(props) {
  const { buttons, setButtons } = useButtons();
  const buttonConfig = {
    notifications: true,
    home: false,
    profile: true,
    logIn: true,
    logOut: true,
    adminDash: true,
    terms: true,
  };
  if (!compareObjects(buttons, buttonConfig)) {
    setButtons(buttonConfig)
  }

  return (
    <Routes>
      <Route path="/" element={<PostWallPage />} />
    </Routes>
  );
}

export default RootRoutes;