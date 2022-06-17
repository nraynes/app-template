import React from 'react';
import CommonLayout from '@/components/CommonLayout';
import ProfileEditor from '@/features/profile/components/ProfileEditor';

function ProfilePage(props) {
  return (
    <CommonLayout>
      <ProfileEditor />
    </CommonLayout>
  );
}

export default ProfilePage;