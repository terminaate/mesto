import React, { FC, ReactNode, useEffect } from 'react';
import {ErrorBoundary as ErrorBoundaryHandler} from 'react-error-boundary';
import BasicPage from '@/components/BasicPage';

interface IErrorBoundary {
  children: ReactNode;
}

interface IErrorFallback {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: FC<IErrorFallback> = ({error, resetErrorBoundary}) => {

  useEffect(() => {
    console.log("Unexpected error", error)
  } ,[])

  return (
    <BasicPage>
      Sorry, an unknown error has passed.
      <button onClick={resetErrorBoundary}>Try again</button>
    </BasicPage>
  )
}

const ErrorBoundary: FC<IErrorBoundary> = ({children}) => {
  return (
    <ErrorBoundaryHandler FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundaryHandler>
  );
};

export default ErrorBoundary;