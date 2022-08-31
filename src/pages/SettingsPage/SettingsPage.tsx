import React, { useState } from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './SettingsPage.module.css';
import SettingsNavBar from '@/pages/SettingsPage/SettingsNavBar';
import SettingsNavPage from '@/pages/SettingsPage/SettingsNavPage';

export type SettingsPageState = 'profile' | 'auth'

const SettingsPage = () => {
	const [page, setPage] = useState<SettingsPageState>('profile');

	return (
		<BasicPage className={cl.settingsPage}>
			<SettingsNavBar page={page} setPage={setPage}/>
			<SettingsNavPage page={page}/>
		</BasicPage>
	);
};

export default SettingsPage;