import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '@/types/ServerResponse/AuthResponse';
import $api, { serverURL } from '@/http';

export type AuthData = { login?: string; email?: string; password: string };

class AuthService {
  async login(loginData: AuthData): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', loginData);
  }

  async register(registerData: AuthData): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/register', registerData);
  }

  async refresh(): Promise<AxiosResponse<{ accessToken: string }>> {
    return $api.post<{ accessToken: string }>('/auth/refresh');
  }

  async logout(): Promise<AxiosResponse> {
    return axios.post(
      '/auth/logout',
      {},
      { withCredentials: true, baseURL: serverURL + '/api' },
    );
  }
}

export default new AuthService();
