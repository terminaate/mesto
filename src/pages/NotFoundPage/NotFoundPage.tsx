import React from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './NotFoundPage.module.css';

const NotFoundPage = () => {
	return (
		<BasicPage className={cl.notFoundPage}>
			404
		</BasicPage>
	);
};

export default NotFoundPage;