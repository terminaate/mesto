import React, { useState } from 'react';
import cl from './RegisterForm.module.scss';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { AuthData } from '@/services/AuthService';
import { register } from '@/store/reducers/user/authAPI';
import useInputState from '@/hooks/useInputState';
import { useAppDispatch } from '@/store';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Error from '@/components/Error';

const RegisterForm = () => {
  const [loginInput, onLoginInputChange] = useInputState('');
  const [loginInputError, setLoginInputError] = useState<string>('');
  const [emailInput, onEmailInputChange] = useInputState('');
  const [emailInputError, setEmailInputError] = useState<string>('');
  const [passwordInput, onPasswordInputChange] = useInputState('');
  const [passwordInputError, setPasswordInputError] = useState<string>('');
  const [passwordType, setPasswordType] = useState<string>('password');
  const dispatch = useAppDispatch();
  const { t } = useTranslation('auth');

  const isEmail = (email: string) => {
    // TODO
    // edit this regexp
    const regexp = /\S+@\S+\.\S+/;
    return regexp.test(email.toLowerCase());
  };

  const registerAttempt = () => {
    if (!loginInput) {
      return setLoginInputError(t('Enter login!'));
    } else if (loginInput.length < 4) {
      return setLoginInputError(t('Minimum login length 4!'));
    } else {
      setLoginInputError('');
    }

    if (emailInput && !isEmail(emailInput)) {
      return setEmailInputError(t('Wrong email format!'));
    } else {
      setEmailInputError('');
    }

    if (!passwordInput) {
      return setPasswordInputError(t('Enter password!'));
    } else if (passwordInput.length < 7) {
      return setPasswordInputError(t('Minimum password length is 7!'));
    } else {
      setPasswordInputError('');
    }

    if (!emailInputError && !loginInputError && !passwordInputError) {
      const registerData: AuthData = {
        login: loginInput,
        password: passwordInput,
      };

      if (emailInput) {
        registerData.email = emailInput;
      }

      dispatch(register(registerData));
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
            placeholder={t('Login*')}
          />
          <Error error={loginInputError} />
        </div>
        <div className={cl.inputContainer}>
          <Input
            value={emailInput}
            onChange={onEmailInputChange}
            placeholder={t('E-mail')}
          />
          <Error error={emailInputError} />
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
      <Button className={cl.registerButton} onClick={registerAttempt}>
        {t('Register')}
      </Button>
    </>
  );
};

export default RegisterForm;
