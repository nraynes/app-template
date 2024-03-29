import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LogInPage from './LogIn';
import SignUpPage from './SignUp';
import { useButtons } from '@/stores/topBarButtons';
import { compareObjects } from '@/utils/core/compare';

function AuthRoutes() {
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
      setButtons(buttonConfig);
    }
  }, []);
  
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default AuthRoutes;