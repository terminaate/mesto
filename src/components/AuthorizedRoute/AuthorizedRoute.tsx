import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '@/services/UserService';
import { useAppSelector } from '@/store';

interface IAuthorizedRoute {
	children: JSX.Element
}

const AuthorizedRoute: FC<IAuthorizedRoute> = ({ children }) => {
	const navigate = useNavigate();
	const { authorized } = useAppSelector(state => state.userSlice);

	useEffect(() => {
		UserService.getUser('@me').catch(() => !authorized && navigate('/login'));
	}, []);

	return children;
};

export default AuthorizedRoute;