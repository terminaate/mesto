import React, { useState } from 'react';
import cl from './LoginForm.module.css';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import useInputState from '@/hooks/useInputState';
import { useAppDispatch, useAppSelector } from '@/store';
import { AuthData } from '@/services/AuthService';
import { FaEye, FaEyeSlash } from 'react-icons/all';
import { login } from '@/store/reducers/user/authAPI';
import { Simulate } from 'react-dom/test-utils';

const LoginForm = () => {
	const [loginInput, onLoginInputChange] = useInputState('');
	const [loginInputError, setLoginInputError] = useState<string>('');
	const [passwordInput, onPasswordInputChange] = useInputState('');
	const [passwordInputError, setPasswordInputError] = useState<string>('');
	const [passwordType, setPasswordType] = useState<string>('password');
	const dispatch = useAppDispatch();
	const { error: serverError } = useAppSelector(state => state.userSlice.user);

	const isEmail = (email: string) => {
		const regexp = /\S+@\S+\.\S+/;
		return regexp.test(email.toLowerCase());
	};

	const loginAttempt = () => {
		if (!loginInput) {
			return setLoginInputError('Введите логин!');
		} else if (loginInput.length < 4) {
			return setLoginInputError('Минимальная длинна логина 4!');
		} else {
			setLoginInputError('');
		}

		if (!passwordInput) {
			return setPasswordInputError('Введите пароль!');
		} else if (passwordInput.length < 7) {
			return setPasswordInputError('Минимальная длинна пароля 7!');
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
			{serverError && <span className={cl.error}>{serverError}</span>}
			<div className={cl.inputsContainer}>
				<div className={cl.inputContainer}>
					<Input value={loginInput} onChange={onLoginInputChange} placeholder={'Адрес электронной почты или логин*'} />
					<div data-error={Boolean(loginInputError)} className={cl.errorContainer}>
						<span className={cl.error}>{loginInputError}</span>
					</div>
				</div>
				<div className={cl.inputContainer}>
					<Input type={passwordType} value={passwordInput} onChange={onPasswordInputChange} placeholder={'Пароль*'}>
						<button onClick={changePasswordType} className={cl.passwordButton}>
							{passwordType === 'text' ? <FaEye /> : <FaEyeSlash />}
						</button>
					</Input>
					<div data-error={Boolean(passwordInputError)} className={cl.errorContainer}>
						<span className={cl.error}>{passwordInputError}</span>
					</div>
				</div>
			</div>
			<Button className={cl.loginButton} onClick={loginAttempt}>Войти</Button>
		</>
	);
};

export default LoginForm;