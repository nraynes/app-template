import React, { useEffect } from 'react';
import CommonLayout from '@/components/CommonLayout';
import LogInForm from '@/features/auth/components/LogInForm';
import getParameterByName from '@/utils/misc/getParams';
import { verifyEmailWithKey } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { gaPageView } from '@/utils/misc/analytics';

function LogInPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gaPageView();
    const emailVerificationCode = getParameterByName('code');
    if (emailVerificationCode) {
      verifyEmailWithKey(emailVerificationCode);
      navigate('/auth/login');
    }
  }, []);
  return (
    <CommonLayout>
      <LogInForm />
    </CommonLayout>
  );
}

export default LogInPage;