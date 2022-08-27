import BasicPage from '@/components/BasicPage';
import useBackgroundImage from '@/hooks/useBackgroundImage';
import { useAppSelector } from '@/store';
import cl from './UserPage.module.css';
import { FaPen } from 'react-icons/all';
import { useState } from 'react';
import ChangeAvatarModal from '@/components/ChangeAvatarModal';

const UserPage = () => {
	const { user } = useAppSelector(state => state.userSlice);
	const [avatarModal, setAvatarModal] = useState<boolean>(false);

	return (
		<>
			<BasicPage>
				<div className={cl.container}>
					<div className={cl.userInfoContainer}>
						<div onClick={() => setAvatarModal(true)} className={cl.userAvatar} style={useBackgroundImage(user.avatar)}>
							<FaPen />
						</div>
						<span className={cl.userName}>{user.username}</span>
						<span className={cl.userBio}>{user.bio}</span>
					</div>
				</div>
			</BasicPage>
			<ChangeAvatarModal modal={avatarModal} setModal={setAvatarModal}/>
		</>
	);
};

export default UserPage;