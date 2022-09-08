import React from 'react';
import { useRoutes } from 'react-router-dom';
import publicRoutes from './public';
import privateRoutes from './private';
import commonRoutes from './common';
import { useAuth } from '@/lib/auth';

function AppRoutes() {
  const auth = useAuth();
  let routes = [...commonRoutes, ...publicRoutes];
  if (auth.user) {
    routes = [...commonRoutes, ...privateRoutes];
  }
  const element = useRoutes([...routes]);
  return <>{element}</>;
}

export default AppRoutes;