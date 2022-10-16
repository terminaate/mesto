import React, { FC } from 'react';
import cl from './Error.module.scss';

interface IError {
  error: string;
  isErrorOccur?: boolean;
}

const Error: FC<IError> = ({ error, isErrorOccur = Boolean(error) }) => {
  return (
    <div data-error={isErrorOccur} className={cl.errorContainer}>
      <span className={cl.error}>{error}</span>
    </div>
  );
};

export default Error;