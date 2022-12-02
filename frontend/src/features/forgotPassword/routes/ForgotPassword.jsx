import React, { useEffect } from 'react';
import CommonLayout from '@/components/CommonLayout';
import ForgotPasswordForm from '@/features/forgotPassword/components/ForgotPasswordForm';
import { gaPageView } from '@/utils/misc/analytics';

function ForgotPasswordPage() {
  useEffect(() => {
    gaPageView();
  }, []);

  return (
    <CommonLayout>
      <ForgotPasswordForm />
    </CommonLayout>
  );
}

export default ForgotPasswordPage;