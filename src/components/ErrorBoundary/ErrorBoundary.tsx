import React, { FC, ReactNode, useEffect } from 'react';
import { ErrorBoundary as ErrorBoundaryHandler } from 'react-error-boundary';
import BasicPage from '@/components/BasicPage';
import cl from './ErrorBoundary.module.scss';
import Button from '@/components/UI/Button';
import { useTranslation } from 'react-i18next';

interface IErrorBoundary {
  children: ReactNode;
}

interface IErrorFallback {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: FC<IErrorFallback> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation('user');

  useEffect(() => {
    console.log('Unexpected error', error);
  }, []);

  return (
    <BasicPage className={cl.errorScreen}>
      {t('Sorry, an unknown error has passed.')}
      <Button onClick={resetErrorBoundary}>{t('Try again')}</Button>
    </BasicPage>
  );
};

const ErrorBoundary: FC<IErrorBoundary> = ({ children }) => {
  return (
    <ErrorBoundaryHandler FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundaryHandler>
  );
};

export default ErrorBoundary;
