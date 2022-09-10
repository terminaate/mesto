import React from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './Loader.module.css';

const Loader = () => {
	return (
		<BasicPage className={cl.loaderPage}>
			Loading
		</BasicPage>
	);
};

export default Loader;