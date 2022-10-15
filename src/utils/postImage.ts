import { serverURL } from '@/http';

export default (userId: string, postId: string): string => {
  return `${serverURL}/static/${userId}/posts/${postId}?t=${+new Date()}`;
};
