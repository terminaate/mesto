import React, { FC, ReactNode, useEffect } from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './BasicAuthPage.module.css';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';

interface IBasicAuthPage {
	children: ReactNode;
	title: string;
}

const BasicAuthPage: FC<IBasicAuthPage> = ({ title, children }) => {
	const { authorized, error: serverError } = useAppSelector(state => state.userSlice);
	const navigate = useNavigate();

	useEffect(() => {
		if (authorized) {
			navigate('/users/@me');
		}
	}, [authorized]);

	return (
		<BasicPage className={cl.authPage}>
			<div className={cl.modalContent}>
				<div className={cl.titles}>
					<span className={cl.logo}>Mesto</span>
					<span>{title}</span>
				</div>
				<div data-error={Boolean(serverError)} className={cl.errorContainer}>
					<span className={cl.error}>{serverError}</span>
				</div>
				{children}
			</div>
		</BasicPage>
	);
};

export default BasicAuthPage;