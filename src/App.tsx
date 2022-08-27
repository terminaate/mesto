import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from '@/pages/AuthPages/LoginPage';
import RegisterPage from '@/pages/AuthPages/RegisterPage';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '@/store';
import { updateUser } from '@/store/reducers/user/userSlice';
import AuthorizedRoute from '@/components/AuthorizedRoute';
import UserPage from '@/pages/UserPage/UserPage';
import { refresh } from '@/store/reducers/user/authAPI';
import { getUser } from '@/store/reducers/user/userAPI';

const App = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(updateUser({ error: null }));
	}, [location.pathname]);

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			dispatch(refresh());
			dispatch(getUser({ userId: '@me' }));
		}
	}, []);

	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route path={'/login'} element={<LoginPage />} />
				<Route path={'/register'} element={<RegisterPage />} />
				<Route path={'/users/@me'} element={
					<AuthorizedRoute>
						<UserPage />
					</AuthorizedRoute>
				} />
			</Routes>
		</AnimatePresence>
	);
};

export default App;