import React from 'react';
import BasicAuthPage from '../BasicAuthPage';
import cl from './LoginPage.module.scss';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import { Trans, useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation('auth');

  return (
    <BasicAuthPage title={t('Login')}>
      <LoginForm />
      <span className={cl.loginLink}>
        <Trans t={t}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account yet? <Link to={'/register'}>Register</Link>
        </Trans>
      </span>
    </BasicAuthPage>
  );
};

export default LoginPage;
