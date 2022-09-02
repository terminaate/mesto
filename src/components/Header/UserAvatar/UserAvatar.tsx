import React, { useRef, useState } from 'react';
import cl from './UserAvatar.module.css';
import useBackgroundImage from '@/hooks/useBackgroundImage';
import useOutsideClick from '@/hooks/useOutsideClick';
import { logout } from '@/store/reducers/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserAvatar = () => {
	const dispatch = useAppDispatch();
	const [userPopup, setUserPopup] = useState(false);
	const userPopupRef = useRef(null);
	const avatarRef = useRef(null);
	const { user } = useAppSelector(state => state.userSlice);
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation('user');

	useOutsideClick(userPopupRef, () => setUserPopup(false), avatarRef);

	const logoutDispatch = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<div ref={avatarRef} className={cl.userAvatar} onClick={() => setUserPopup(!userPopup)}
				 style={useBackgroundImage(user.avatar)}>
			<div ref={userPopupRef} data-active={userPopup}
					 className={cl.userAvatarContainer}>
				{location.pathname !== '/users/@me' && (
					<button onClick={() => navigate('/users/@me')}>{t('Your page')}</button>
				)}
				<button onClick={() => navigate('/settings')}>{t('Settings')}</button>
				<button onClick={logoutDispatch}>{t('Logout')}</button>
			</div>
		</div>
	);
};

export default UserAvatar;