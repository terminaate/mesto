import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store';

interface IAuthorizedRoute {
	children: JSX.Element
}

const AuthorizedRoute: FC<IAuthorizedRoute> = ({ children }) => {
	const { authorized } = useAppSelector(state => state.userSlice);

	return authorized ? children : <Navigate to={'/login'} />;
};

export default AuthorizedRoute;