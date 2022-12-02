import React, { useEffect } from 'react';
import CommonLayout from '@/components/CommonLayout';
import SignUpForm from '@/features/auth/components/SignUpForm';
import { gaPageView } from '@/utils/misc/analytics';

function SignUpPage() {
  useEffect(() => {
    gaPageView();
  }, []);
  
  return (
    <CommonLayout>
      <SignUpForm />
    </CommonLayout>
  );
}

export default SignUpPage;