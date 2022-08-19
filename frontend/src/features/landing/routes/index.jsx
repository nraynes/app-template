import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PostWallPage from './Landing';
import { useButtons } from '@/stores/topBarButtons';
import { compareObjects } from '@/utils/core/compare';

function RootRoutes(props) {
  const { buttons, setButtons } = useButtons();
  const buttonConfig = {
    colorPicker: true,
    home: false,
    profile: true,
    logIn: true,
    logOut: true,
    settings: false,
    help: false,
  };
  
  useEffect(() => {
    if (!compareObjects(buttons, buttonConfig)) {
      setButtons(buttonConfig)
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<PostWallPage />} />
    </Routes>
  );
}

export default RootRoutes;