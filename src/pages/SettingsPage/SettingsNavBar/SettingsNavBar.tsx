import React, { FC } from 'react';
import { SettingsPageState } from '@/pages/SettingsPage/SettingsPage';

interface ISettingsNavBar {
	page: SettingsPageState;
	setPage: React.Dispatch<React.SetStateAction<SettingsPageState>>
}

const SettingsNavBar: FC<ISettingsNavBar> = ({ page, setPage }) => {
	return (
		<div>
			Nav
		</div>
	);
};

export default SettingsNavBar;