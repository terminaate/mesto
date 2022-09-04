import React from 'react';
import BasicAuthPage from '../BasicAuthPage';
import cl from './RegisterPage.module.css';
import RegisterForm from './RegisterForm';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
	const { t } = useTranslation('auth');

	return (
		<BasicAuthPage title={t('Register')}>
			<RegisterForm />
			<span className={cl.loginLink}>
				<Trans t={t}>Already have an account? <Link to={'/login'}>To come in</Link></Trans>
			</span>
		</BasicAuthPage>
	);
};

export default RegisterPage;