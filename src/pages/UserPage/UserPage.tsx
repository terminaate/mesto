import BasicPage from '@/components/BasicPage';
import { useAppSelector } from '@/store';

const UserPage = () => {
	const { user } = useAppSelector(state => state.userSlice);

	return (
		<BasicPage>
			{JSON.stringify(user)}
		</BasicPage>
	);
};

export default UserPage;