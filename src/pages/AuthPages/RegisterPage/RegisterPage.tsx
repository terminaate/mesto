import React, { useEffect } from 'react';
import BasicAuthPage from '../BasicAuthPage';
import cl from './RegisterPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { useAppSelector } from '@/store';

const RegisterPage = () => {
	return (
		<BasicAuthPage title={'Регистрация'}>
			<RegisterForm />
			<span className={cl.loginLink}>Уже есть аккаунт? <Link to={'/login'}>Войти</Link></span>
		</BasicAuthPage>
	);
};

export default RegisterPage;