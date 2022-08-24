import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store';

const AuthorizedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
	const { authorized } = useAppSelector(state => state.userSlice);

	return authorized ? children : <Navigate to={'/login'} />;
};

export default AuthorizedRoute;