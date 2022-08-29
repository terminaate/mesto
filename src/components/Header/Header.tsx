import React from 'react';
import { useAppSelector } from '@/store';
import { motion } from 'framer-motion';
import cl from './Header.module.css';
import SearchInput from './SearchInput';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/UI/Button';
import UserAvatar from './UserAvatar';

const Header = () => {
	const { authorized } = useAppSelector(state => state.userSlice);
	const navigate = useNavigate();
	const location = useLocation();

	const navigateToLoginPage = () => {
		navigate('/login');
	};

	return (
		<motion.div className={cl.headerContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}>
			<span className={cl.logo}>Mesto</span>
			{(location.pathname !== '/login' && location.pathname !== '/register') && (
				<>
					<SearchInput />
					{authorized ?
						<UserAvatar />
						: <Button onClick={navigateToLoginPage}>Войти</Button>
					}
				</>
			)}
		</motion.div>
	);
};

export default Header;