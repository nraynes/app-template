import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './Profile';
import { useButtons } from '@/stores/topBarButtons';
import compareObjects from '@/utils/core/compareObjects';

function ProfileRoutes(props) {
  const { buttons, setButtons } = useButtons();
  const buttonConfig = {
    home: true,
    profile: false,
    logIn: false,
    logOut: true,
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