import React, { useEffect } from 'react';
import CommonLayout from '@/components/CommonLayout';
import ProfileEditor from '@/features/profile/components/ProfileEditor';
import { gaPageView } from '@/utils/misc/analytics';

function ProfilePage() {
  useEffect(() => {
    gaPageView();
  }, []);

  return (
    <CommonLayout>
      <ProfileEditor />
    </CommonLayout>
  );
}

export default ProfilePage;