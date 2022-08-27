import { AxiosResponse } from 'axios';
import $api from '@/http';
import { UserProps } from '@/types/User';
import { editUserProps } from '@/store/reducers/user/userAPI';

class UserService {
	async getUser(userId: string): Promise<AxiosResponse<UserProps>> {
		return await $api.get<UserProps>(`/users/${userId}`);
	}

	async patchUser(data: editUserProps): Promise<AxiosResponse<editUserProps>> {
		const { id, ...bodyData } = data;
		return await $api.patch<editUserProps>(`/users/${data.id}`, bodyData);
	}
}

export default new UserService();
