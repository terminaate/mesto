import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '@/services/UserService';

interface IAuthorizedRoute {
	children: JSX.Element
}

const AuthorizedRoute: FC<IAuthorizedRoute> = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		UserService.getUser('@me').catch(() => navigate('/login'));
	}, []);

	return children;
};

export default AuthorizedRoute;