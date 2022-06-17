/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CommonLayout from '@/components/CommonLayout';
import ChangePasswordForm from '@/features/forgotPassword/components/ChangePasswordForm';
import validateCode from '@/features/forgotPassword/api/validateCode';
import getParameterByName from '@/utils/misc/getParams';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import apiCall from '@/utils/core/apiCall';

function ChangePasswordPage(props) {
  const [accountID, setAccountID] = useState()
  const navigate = useNavigate();
  const queryParam = getParameterByName('temp');
  const { enqueueSnackbar } = useSnackbar();

  const validateQueryCode = async (queryParam, setFunction) => {
    apiCall(() => validateCode(queryParam), {
      SUCCESS: (response) => {
        setFunction(response);
      },
      NOTVALID: () => {
        enqueueSnackbar('Temporary Code Invalid.', { variant: 'error' });
        navigate('/auth/login');
      },
    })
  };

  useEffect(() => {
    if (queryParam) {
      validateQueryCode(queryParam, setAccountID);
    } else {
      enqueueSnackbar('No Temporary Code.', { variant: 'error' })
      navigate('/auth/login')
    }
  }, [])

  return (
    <CommonLayout>
      <ChangePasswordForm code={queryParam} accountID={accountID} />
    </CommonLayout>
  );
}

export default ChangePasswordPage;