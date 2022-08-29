import BasicPage from '@/components/BasicPage';
import useBackgroundImage from '@/hooks/useBackgroundImage';
import { useAppSelector } from '@/store';
import cl from './UserPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserProps } from '@/types/User';
import UserService from '@/services/UserService';
import useUserAvatar from '@/hooks/useUserAvatar';

const UserPage = () => {
	const { user: selfUserData } = useAppSelector(state => state.userSlice);
	const [avatarModal, setAvatarModal] = useState<boolean>(false);
	const params = useParams();
	const [userData, setUserData] = useState<UserProps>({} as UserProps);
	const isMounted = useRef(false);

	const getUserData = async () => {
		if (params.id === '@me' || params.id === selfUserData.id) {
			setUserData(selfUserData);
		} else {
			try {
				const { data } = await UserService.getUser(params.id!);
				setUserData({ ...data, avatar: useUserAvatar(data.id) });
			} catch (e) {
				setUserData({} as UserProps);
			}	
		}
	};

	useEffect(() => {
		getUserData();
	}, [selfUserData]);

	return (
		<>
			<BasicPage>
				{(userData && Object.values(userData).length > 0) && (
					<>
						<div className={cl.container}>
							<div className={cl.userInfoContainer}>
								<div className={cl.userAvatar} style={useBackgroundImage(userData.avatar!)} />
								<span className={cl.userName}>{userData.username}</span>
								<span className={cl.userBio}>{userData.bio}</span>
							</div>
						</div>
						{/*<ChangeAvatarModal modal={avatarModal} setModal={setAvatarModal} />*/}
					</>
				)}
			</BasicPage>
		</>
	);
};

export default UserPage;