import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './Profile';
import { useButtons } from '@/stores/topBarButtons';
import compareObjects from '@/utils/core/compareObjects';

function ProfileRoutes(props) {
  const { buttons, setButtons } = useButtons();
  const buttonConfig = {
    colorPicker: true,
    home: true,
    profile: true,
    logIn: false,
    logOut: true,
    settings: false,
    help: false,
  };
  if (!compareObjects(buttons, buttonConfig)) {
    setButtons(buttonConfig)
  }
  
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default ProfileRoutes;