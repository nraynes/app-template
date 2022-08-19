import React from 'react';
import CommonLayout from '@/components/CommonLayout';
import SignUpForm from '@/features/auth/components/SignUpForm';

function SignUpPage(props) {
  return (
    <CommonLayout>
      <SignUpForm />
    </CommonLayout>
  );
}

export default SignUpPage;