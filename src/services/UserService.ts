import { AxiosResponse } from 'axios';
import $api from '@/http';
import { UserProps } from '@/types/User';
import { editUserProps } from '@/store/reducers/user/userAPI';
import { PostProps } from '@/types/Post';
import postImage from '@/utils/postImage';
import userAvatar from '@/utils/userAvatar';

export type createPostProps = {
	userId: string;
	title: string;
	description?: string;
	image: string;
};

class UserService {
	async getUser(userId: string): Promise<AxiosResponse<UserProps>> {
		return await $api.get<UserProps>(`/users/${userId}`);
	}

	async patchUser(data: editUserProps): Promise<AxiosResponse<editUserProps>> {
		const { id, ...bodyData } = data;
		return await $api.patch<editUserProps>(`/users/${data.id}`, bodyData);
	}

	async createNewPost(
		data: createPostProps
	): Promise<AxiosResponse<PostProps>> {
		return await $api.post<PostProps>('/posts', data);
	}

	async getUserPosts(userId: string): Promise<AxiosResponse<PostProps[] | []>> {
		const posts = await $api.get<PostProps[] | []>(`/users/${userId}/posts`);
		posts.data = posts.data.map((post) => ({
			...post,
			image: postImage(post.userId!, post.id!),
		}));
		return posts;
	}

	async searchUsers(username: string): Promise<AxiosResponse<UserProps[]>> {
		const variants = await $api.get<UserProps[]>(
			`/users/search?username=${username}`
		);
		variants.data = variants.data.map((variant) => ({
			...variant,
			avatar: userAvatar(variant.id),
		}));
		return variants;
	}

	async likePost(postId: string): Promise<AxiosResponse<PostProps>> {
		const post = await $api.post<PostProps>(`/posts/${postId}/like`);
		post.data.image = postImage(post.data.userId!, post.data.id!);
		return post;
	}

	async deletePost(postId: string): Promise<AxiosResponse<PostProps>> {
		const post = await $api.delete<PostProps>(`/posts/${postId}`);
		post.data.image = postImage(post.data.userId!, post.data.id!);
		return post;
	}
}

export default new UserService();
