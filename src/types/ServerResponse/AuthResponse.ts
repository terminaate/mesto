import { UserProps } from '@/types/User';

export type AuthResponse = {
  accessToken: string;
  user: UserProps;
};
