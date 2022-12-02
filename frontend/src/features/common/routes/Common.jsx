import React, { useEffect } from 'react';
import CommonLayout from '@/components/CommonLayout';
import { gaPageView } from '@/utils/misc/analytics';

function CommonPage() {
  useEffect(() => {
    gaPageView();
  }, []);

  return (
    <CommonLayout>

    </CommonLayout>
  );
}

export default CommonPage;