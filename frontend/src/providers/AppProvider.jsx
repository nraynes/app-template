import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import LoadingPage from '@/components/LoadingPage';
import ErrorPage from '@/components/ErrorPage';
import { AuthProvider } from '@/lib/auth';
import AskAlert from '@/components/AskAlert';
import InputAlert from '@/components/InputAlert';
import { useInputAlert } from '@/stores/inputAlertStore';
import { useAskAlert } from '@/stores/askAlertStore';
import Awaiting from '@/components/Awaiting';
import { queryClient } from '@/lib/react-query';
import GlobalProvider from './GlobalProvider';
import { useAwaiting } from '@/stores/awaitingStore';

const ErrorFallback = () => (
  <ErrorPage />
);

const theme = createTheme({});

export const AppProvider = ({ children }) => {
  const { awaiting } = useAwaiting();
  const { askStatus, askTitle, askMessage, askElement, allowEnter, askCallBack, closeAsk } = useAskAlert();
  const { inputStatus, inputTitle, inputMessage, inputCallBack, closeInput } = useInputAlert();
  
  return (
  <React.Suspense
    fallback={(
      <LoadingPage />
    )}
  >
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <AuthProvider>
              <SnackbarProvider maxSnack={3}>
                <Router>
                  <GlobalProvider>
                    <Awaiting 
                      open={awaiting}
                    />
                    <InputAlert
                      open={inputStatus}
                      onClose={(response) => {
                        closeInput();
                        if (inputCallBack) {
                          inputCallBack(response);
                        }
                      }}
                      title={inputTitle}
                      message={inputMessage}
                    />
                    <AskAlert
                      open={askStatus}
                      onClose={(answer) => {
                        closeAsk();
                        if (askCallBack) {
                          askCallBack(answer);
                        }
                      }}
                      title={askTitle}
                      element={askElement}
                      message={askMessage}
                      allowEnter={allowEnter}
                    />
                    {children}
                  </GlobalProvider>
                </Router>
              </SnackbarProvider>
            </AuthProvider>
          </HelmetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.Suspense>
)};

export default AppProvider;
