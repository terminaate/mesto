import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateUser } from '@/store/reducers/user/userSlice';
import AuthorizedRoute from '@/components/AuthorizedRoute';
import { refresh } from '@/store/reducers/user/authAPI';
import { getUser, getUserPosts } from '@/store/reducers/user/userAPI';
import Header from '@/components/Header';

const SettingsPage = React.lazy(() => import('@/pages/SettingsPage'));
const UserPage = React.lazy(() => import('@/pages/UserPage'));
const LoginPage = React.lazy(() => import('@/pages/AuthPages/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/AuthPages/RegisterPage'));

const App = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { authorized } = useAppSelector(state => state.userSlice);

	useEffect(() => {
		dispatch(updateUser({ error: null }));
	}, [location.pathname]);

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			dispatch(refresh());
			dispatch(getUser({ userId: '@me' }));
		}
	}, []);

	useEffect(() => {
		if (authorized) {
			dispatch(getUserPosts());
		}
	}, [authorized]);

	return (
		<>
			<Header />
			<AnimatePresence exitBeforeEnter>
				<Routes location={location} key={location.pathname}>
					<Route path={'/login'} element={<LoginPage />} />
					<Route path={'/register'} element={<RegisterPage />} />
					<Route path={'/users/:id'} element={
						<AuthorizedRoute>
							<UserPage />
						</AuthorizedRoute>
					} />
					<Route path={'/settings'} element={
						<AuthorizedRoute>
							<SettingsPage />
						</AuthorizedRoute>
					} />
				</Routes>
			</AnimatePresence>
		</>
	);
};

export default App;