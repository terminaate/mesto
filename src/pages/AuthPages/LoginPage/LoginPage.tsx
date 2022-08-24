import React, { useEffect } from 'react';
import BasicAuthPage from '../BasicAuthPage';
import cl from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAppSelector } from '@/store';

const LoginPage = () => {
	return (
		<BasicAuthPage title={'Вход'}>
			<LoginForm />
			<span className={cl.loginLink}>Ещё нету аккаунта? <Link to={'/register'}>Зарегестрироваться</Link></span>
		</BasicAuthPage>
	);
};

export default LoginPage;