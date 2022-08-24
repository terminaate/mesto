import React, { FC, ReactNode, useEffect } from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './BasicAuthPage.module.css';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';

type BasicAuthPageProps = {
	children: ReactNode
	onHide?: () => void;
	title?: string;
}

const BasicAuthPage: FC<BasicAuthPageProps> = ({ children, onHide, title }) => {
	const { authorized } = useAppSelector(state => state.userSlice);
	const navigate = useNavigate();

	useEffect(() => {
		if (authorized) {
			navigate('/users/@me');
		}
	}, [authorized]);

	return (
		<BasicPage>
			<div className={cl.modalContent}>
				<div className={cl.titles}>
					<span className={cl.logo}>Mesto</span>
					<span>{title!}</span>
				</div>
				{children}
			</div>
		</BasicPage>
	);
};

export default BasicAuthPage;