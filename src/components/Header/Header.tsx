import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/reducers/user/userSlice';
import { motion } from 'framer-motion';
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
		<motion.div className={cl.headerContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			<span className={cl.logo}>Mesto</span>
			<SearchInput />
			<div className={cl.userAvatar} onClick={logoutDispatch} style={useBackgroundImage(user.avatar)} />
		</motion.div>
	);
};

export default Header;