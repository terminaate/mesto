import { PostProps } from '@/types/Post';

export type UserProps = {
	id: string;
	email?: string;
	avatar?: string;
	username: string;
	bio?: string;
	posts?: PostProps[] | []
};
