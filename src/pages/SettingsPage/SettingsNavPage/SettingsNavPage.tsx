import React, { FC } from 'react';
import { SettingsPageState } from '@/pages/SettingsPage/SettingsPage';

interface ISettingsNavPage {
	page: SettingsPageState
}

const SettingsNavPage: FC<ISettingsNavPage> = ({ page }) => {
	return (
		<div>
			PAGE
		</div>
	);
};

export default SettingsNavPage;