import React, { useState } from 'react';
import cl from './LoginForm.module.scss';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import useInputState from '@/hooks/useInputState';
import { useAppDispatch } from '@/store';
import { AuthData } from '@/services/AuthService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from '@/store/reducers/user/authAPI';
import { useTranslation } from 'react-i18next';
import Error from '@/components/Error';

const LoginForm = () => {
  const [loginInput, onLoginInputChange] = useInputState('');
  const [loginInputError, setLoginInputError] = useState<string>('');
  const [passwordInput, onPasswordInputChange] = useInputState('');
  const [passwordInputError, setPasswordInputError] = useState<string>('');
  const [passwordType, setPasswordType] = useState<string>('password');
  const dispatch = useAppDispatch();
  const { t } = useTranslation('auth');

  const isEmail = (email: string) => {
    const regexp = /\S+@\S+\.\S+/;
    return regexp.test(email.toLowerCase());
  };

  const loginAttempt = () => {
    if (!loginInput) {
      return setLoginInputError(t('Enter login!'));
    } else if (loginInput.length < 4) {
      return setLoginInputError(t('Minimum login length 4!'));
    } else {
      setLoginInputError('');
    }

    if (!passwordInput) {
      return setPasswordInputError(t('Enter password!'));
    } else if (passwordInput.length < 7) {
      return setPasswordInputError(t('Minimum password length is 7!'));
    } else {
      setPasswordInputError('');
    }

    if (!loginInputError && !passwordInputError) {
      const loginData: AuthData = { password: passwordInput };

      if (isEmail(loginInput)) {
        loginData.email = loginInput;
      } else {
        loginData.login = loginInput;
      }

      dispatch(login(loginData));
    }
  };

  const changePasswordType = () => {
    setPasswordType(passwordType === 'text' ? 'password' : 'text');
  };

  return (
    <>
      <div className={cl.inputsContainer}>
        <div className={cl.inputContainer}>
          <Input
            value={loginInput}
            onChange={onLoginInputChange}
            placeholder={t('Email or login*')}
          />
          <Error error={loginInputError} />
        </div>
        <div className={cl.inputContainer}>
          <Input
            type={passwordType}
            value={passwordInput}
            onChange={onPasswordInputChange}
            placeholder={t('Password*')}
          >
            <button onClick={changePasswordType} className={cl.passwordButton}>
              {passwordType === 'text' ? <FaEye /> : <FaEyeSlash />}
            </button>
          </Input>
          <Error error={passwordInputError} />
        </div>
      </div>
      <Button className={cl.loginButton} onClick={loginAttempt}>
        {t('Login')}
      </Button>
    </>
  );
};

export default LoginForm;
