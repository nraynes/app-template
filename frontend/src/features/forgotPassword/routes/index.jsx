import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPasswordPage from './ForgotPassword';
import ChangePasswordPage from './ChangePassword';
import { useButtons } from '@/stores/topBarButtons';
import compareObjects from '@/utils/core/compareObjects';

function PasswordRoutes(props) {
  const { buttons, setButtons } = useButtons();
  const buttonConfig = {
    home: true,
    profile: false,
    logIn: false,
    logOut: false,
  };
  if (!compareObjects(buttons, buttonConfig)) {
    setButtons(buttonConfig)
  }
  
  return (
    <Routes>
      <Route path="/forgot" element={<ForgotPasswordPage />} />
      <Route path="/change" element={<ChangePasswordPage />} />
    </Routes>
  );
}

export default PasswordRoutes;