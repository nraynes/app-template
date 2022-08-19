import React from 'react';
import CommonLayout from '@/components/CommonLayout';
import ForgotPasswordForm from '@/features/forgotPassword/components/ForgotPasswordForm';

function ForgotPasswordPage(props) {
  return (
    <CommonLayout>
      <ForgotPasswordForm />
    </CommonLayout>
  );
}

export default ForgotPasswordPage;