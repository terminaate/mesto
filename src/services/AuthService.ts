import { AxiosResponse } from 'axios';
import { AuthResponse } from '@/types/ServerResponse/AuthResponse';
import $api from '@/http';

export type AuthData = { login?: string; email?: string; password: string };

class AuthService {
	async login(loginData: AuthData): Promise<AxiosResponse<AuthResponse>> {
		return await $api.post<AuthResponse>('/auth/login', loginData);
	}

	async register(registerData: AuthData): Promise<AxiosResponse<AuthResponse>> {
		return await $api.post<AuthResponse>('/auth/register', registerData);
	}

	async refresh(): Promise<AxiosResponse<{ accessToken: string }>> {
		return await $api.post<{ accessToken: string }>('/auth/refresh');
	}
}

export default new AuthService();
