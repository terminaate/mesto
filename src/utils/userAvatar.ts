import { serverURL } from '@/http';

export default (userId: string): string => {
	return `${serverURL}/static/${userId}/avatar?t=${+new Date()}`;
};
