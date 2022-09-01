import React, { ChangeEvent, useState } from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './SettingsPage.module.css';
import { useAppSelector } from '@/store';
import useBackgroundImage from '@/hooks/useBackgroundImage';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';

const SettingsPage = () => {
	const { user } = useAppSelector(state => state.userSlice);
	const [avatar, setAvatar] = useState<string>(user.avatar);

	const onAvatarInputChange = (e: ChangeEvent<HTMLInputElement>) => {

	};

	return (
		<>
			<BasicPage className={cl.settingsPage}>
				<div className={cl.container}>
					<label>
						<input type='file' onChange={onAvatarInputChange} style={{ display: 'none' }} />
						<div className={cl.avatarImage}
								 style={useBackgroundImage(avatar)} />
						<Button className={cl.avatarChangeButton}>Change avatar</Button>
					</label>
					<Input />
				</div>
			</BasicPage>
		</>
	);
};

export default SettingsPage;