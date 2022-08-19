/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAskAlert } from '@/stores/askAlertStore';
import { useInputAlert } from '@/stores/inputAlertStore';
import { useAwaiting } from '@/stores/awaitingStore';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import publicRoutes from '@/routes/public';
import privateRoutes from '@/routes/private';

function GlobalProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const { ask } = useAskAlert();
  const { askForInput } = useInputAlert();
  const { nowAwaiting, notAwaiting } = useAwaiting();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAuth();

  const location = window.location.href;

  if (
    location.substring(0,5) !== 'https'
    && process.env.NODE_ENV !== 'development'
  ) {
    const url = location.substring(5,location.length)
    const newLocation = `https:${url}`
    window.location.href = newLocation;
  }

  const pubRoutes = publicRoutes.map((item) => item.path.substring(0, item.path.length-2))

  const privRoutes = privateRoutes.map((item) => item.path.substring(0, item.path.length-2))

  useEffect(() => {
    if ((auth.user && pubRoutes.some((route) => pathname.match(route)))
    || (!auth.user && privRoutes.some((route) => pathname.match(route)))) {
      navigate('/');
    }
  }, [pathname]);

  window.enqueueSnackbar = enqueueSnackbar;
  window.ask = ask;
  window.askForInput = askForInput;
  window.nowAwaiting = nowAwaiting;
  window.notAwaiting = notAwaiting;
  window.navigate = navigate;
  window.reloadUser = auth.refetchUser;
  return (
    <>
      {children}
    </>
  );
}

export default GlobalProvider;