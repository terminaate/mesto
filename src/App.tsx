import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateUser } from '@/store/reducers/user/userSlice';
import AuthorizedRoute from '@/components/AuthorizedRoute';
import { refresh } from '@/store/reducers/user/authAPI';
import { getUser, getUserPosts } from '@/store/reducers/user/userAPI';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import NotFoundPage from '@/pages/NotFoundPage';
import SettingsAccountPage from '@/pages/SettingsPage/SettingsAccountPage';

const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const UserPage = lazy(() => import('@/pages/UserPage'));
const LoginPage = lazy(() => import('@/pages/AuthPages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/AuthPages/RegisterPage'));

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
			dispatch(getUser('@me'));
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
			<Suspense fallback={<Loader />}>
				<Routes location={location}>
					<Route index element={<Navigate to={'/login'} />} />
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
					}>
						<Route path={'account'} element={
							<AuthorizedRoute>
								<SettingsAccountPage />
							</AuthorizedRoute>
						} />
					</Route>
					<Route path={'/*'} element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</>
	);
};

export default App;