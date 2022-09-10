import React, { useState } from 'react';
import { useAppSelector } from '@/store';
import cl from './Header.module.css';
import SearchInput from './SearchInput';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/UI/Button';
import UserAvatar from './UserAvatar';
import { FaPlus } from 'react-icons/all';
import CreatePostModal from '@/components/CreatePostModal';

const Header = () => {
	const { authorized, user } = useAppSelector(state => state.userSlice);
	const navigate = useNavigate();
	const [createPostModal, setCreatePostModal] = useState<boolean>(false);

	const navigateToLoginPage = () => {
		navigate('/login');
	};

	const createPostButtonClick = () => {
		setCreatePostModal(true);
		navigate('/users/@me');
	};

	return (
		<>
			<div className={cl.headerContainer}>
				<span className={cl.logo}>Mesto</span>
				{location.pathname !== '/login' && location.pathname !== '/register' && (
					<>
						{authorized ? <SearchInput /> : <span />}
						{authorized ?
							<div className={cl.userButtons}>
								<button onClick={createPostButtonClick} className={cl.createPostButton}>
									<FaPlus />
								</button>
								<UserAvatar />
							</div>
							: <Button onClick={navigateToLoginPage}>Войти</Button>
						}
					</>
				)}
				<CreatePostModal modal={createPostModal} setModal={setCreatePostModal} />
			</div>
		</>
	);
};

export default Header;