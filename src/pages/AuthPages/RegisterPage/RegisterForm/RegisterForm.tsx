import React, { useState } from 'react';
import cl from './RegisterForm.module.css';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { AuthData } from '@/services/AuthService';
import { register } from '@/store/reducers/user/authAPI';
import useInputState from '@/hooks/useInputState';
import { useAppDispatch, useAppSelector } from '@/store';
import { FaEye, FaEyeSlash } from 'react-icons/all';

const RegisterForm = () => {
	const [loginInput, onLoginInputChange] = useInputState('');
	const [loginInputError, setLoginInputError] = useState<string>('');
	const [emailInput, onEmailInputChange] = useInputState('');
	const [emailInputError, setEmailInputError] = useState<string>('');
	const [passwordInput, onPasswordInputChange] = useInputState('');
	const [passwordInputError, setPasswordInputError] = useState<string>('');
	const [passwordType, setPasswordType] = useState<string>('password');
	const dispatch = useAppDispatch();
	const { error: serverError } = useAppSelector(state => state.userSlice.user);

	const isEmail = (email: string) => {
		const regexp = /\S+@\S+\.\S+/;
		return regexp.test(email.toLowerCase());
	};

	const registerAttempt = () => {
		if (!loginInput) {
			return setLoginInputError('Введите логин!');
		} else if (loginInput.length < 4) {
			return setLoginInputError('Минимальная длинна логина 4!');
		} else {
			setLoginInputError('');
		}

		if (emailInput && !isEmail(emailInput)) {
			return setEmailInputError('Неправильный формат почты!');
		} else {
			setEmailInputError('');
		}

		if (!passwordInput) {
			return setPasswordInputError('Введите пароль!');
		} else if (passwordInput.length < 7) {
			return setPasswordInputError('Минимальная длинна пароля 7!');
		} else {
			setPasswordInputError('');
		}

		if (!emailInputError && !loginInputError && !passwordInputError) {
			const registerData: AuthData = { login: loginInput, password: passwordInput };

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
			{serverError && <span className={cl.error}>{serverError}</span>}
			<div className={cl.inputsContainer}>
				<div className={cl.inputContainer}>
					<Input value={loginInput} onChange={onLoginInputChange} placeholder={'Логин*'} />
					<div data-error={Boolean(loginInputError)} className={cl.errorContainer}>
						<span className={cl.error}>{loginInputError}</span>
					</div>
				</div>
				<div className={cl.inputContainer}>
					<Input value={emailInput} onChange={onEmailInputChange} placeholder={'Адрес электронной почты'} />
					<div data-error={Boolean(emailInputError)} className={cl.errorContainer}>
						<span className={cl.error}>{emailInputError}</span>
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
			<Button className={cl.registerButton} onClick={registerAttempt}>Зарегестрироваться</Button>
		</>
	);
};

export default RegisterForm;