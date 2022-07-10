import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPasswordPage from './ForgotPassword';
import ChangePasswordPage from './ChangePassword';
import { useButtons } from '@/stores/topBarButtons';
import { compareObjects } from '@/utils/core/compare';

function PasswordRoutes(props) {
  const { buttons, setButtons } = useButtons();
  const buttonConfig = {
    colorPicker: true,
    home: true,
    profile: false,
    logIn: false,
    logOut: false,
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
      <Route path="/forgot" element={<ForgotPasswordPage />} />
      <Route path="/change" element={<ChangePasswordPage />} />
    </Routes>
  );
}

export default PasswordRoutes;