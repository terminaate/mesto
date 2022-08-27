import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/reducers/user/userSlice';
import cl from './Header.module.css';
import SearchInput from '@/components/Header/SearchInput/SearchInput';
import useBackgroundImage from '@/hooks/useBackgroundImage';

const Header = () => {
	const dispatch = useAppDispatch();
	const { user, authorized } = useAppSelector(state => state.userSlice);

	const logoutDispatch = () => {
		dispatch(logout());
	};

	return (
		<div className={cl.headerContainer} onClick={logoutDispatch}>
			<span className={cl.logo}>Mesto</span>
			<SearchInput />
			<div className={cl.userAvatar} style={useBackgroundImage(user.avatar)} />
		</div>
	);
};

export default Header;