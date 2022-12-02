import React, { useEffect } from 'react';
import CommonLayout from '@/components/CommonLayout';
import ChangePasswordForm from '@/features/forgotPassword/components/ChangePasswordForm';
import validateCode from '@/features/forgotPassword/api/validateCode';
import getParameterByName from '@/utils/misc/getParams';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import apiCall from '@/utils/core/apiCall';
import { gaPageView } from '@/utils/misc/analytics';

function ChangePasswordPage() {
  const navigate = useNavigate();
  const queryParam = getParameterByName('temp');
  const { enqueueSnackbar } = useSnackbar();

  const validateQueryCode = async (queryParam) => {
    apiCall(() => validateCode(queryParam), {
      SUCCESS: () => {},
      NOTVALID: () => {
        enqueueSnackbar('Temporary Code Invalid.', { variant: 'error' });
        navigate('/auth/login');
      },
    });
  };

  useEffect(() => {
    gaPageView();
    if (queryParam) {
      validateQueryCode(queryParam);
    } else {
      enqueueSnackbar('No Temporary Code.', { variant: 'error' });
      navigate('/auth/login');
    }
  }, []);

  return (
    <CommonLayout>
      <ChangePasswordForm code={queryParam} />
    </CommonLayout>
  );
}

export default ChangePasswordPage;