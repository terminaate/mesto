import React, { lazy, Suspense, useEffect } from 'react';
import Loader from '@/components/Loader';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthorizedRoute from '@/components/AuthorizedRoute';
import NotFoundPage from '@/pages/NotFoundPage';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateUser } from '@/store/reducers/user/userSlice';
import { refresh } from '@/store/reducers/user/authAPI';
import { getUser, getUserPosts } from '@/store/reducers/user/userAPI';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from '@/components/ErrorBoundary';

const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const SettingsAccountPage = lazy(() => import('@/pages/SettingsPage/SettingsAccountPage'));
const SettingsAppearancePage = lazy(() => import('@/pages/SettingsPage/SettingsAppearancePage'));
const UserPage = lazy(() => import('@/pages/UserPage'));
const LoginPage = lazy(() => import('@/pages/AuthPages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/AuthPages/RegisterPage'));

const Routing = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { authorized } = useAppSelector((state) => state.userSlice);

  // TRASH TREAD

  // reset error when page changes
  useEffect(() => {
    dispatch(updateUser({ error: null }));
  }, [location.pathname]);

  // Trying to authorize user
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(refresh());
      dispatch(getUser('@me'));
    }
  }, []);

  // Sync user posts
  useEffect(() => {
    if (authorized) {
      dispatch(getUserPosts());
    }
  }, [authorized]);

  return (
    <AnimatePresence mode={'wait'}>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes location={location} key={location.key}>
            <Route index />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
            <Route
              path={'/users/:id'}
              element={
                <AuthorizedRoute>
                  <UserPage />
                </AuthorizedRoute>
              }
            />
            <Route
              path={'/settings'}
              element={
                <AuthorizedRoute>
                  <SettingsPage />
                </AuthorizedRoute>
              }
            >
              <Route
                path={'account'}
                element={
                  <AuthorizedRoute>
                    <SettingsAccountPage />
                  </AuthorizedRoute>
                }
              />
              <Route
                path={'Appearance'}
                element={
                  <AuthorizedRoute>
                    <SettingsAppearancePage />
                  </AuthorizedRoute>
                }
              />
            </Route>
            <Route path={'/*'} element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AnimatePresence>
  );
};

export default Routing;
