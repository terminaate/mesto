import axios from 'axios';
import { AuthResponse } from '@/types/ServerResponse/AuthResponse';
import store from '@/store';
import { userSlice } from '@/store/reducers/user/userSlice';

// TODO
// Сделать переменные окружения prod и env, а так-же здесь заменить serverUrl на перменныю из окружения

export const serverURL = 'http://127.0.0.1:5000';
const baseURL = serverURL + '/api';

const $api = axios.create({
	baseURL,
	withCredentials: true
});

$api.interceptors.request.use((config) => {
	if (localStorage.getItem('accessToken')) {
		config.headers!.Authorization = `Bearer ${localStorage.getItem(
			'accessToken'
		)}`;
	}
	return config;
});

$api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.post<AuthResponse>(
					`${baseURL}/auth/refresh`,
					{ withCredentials: true }
				);
				localStorage.setItem('accessToken', response.data.accessToken);
				return $api.request(originalRequest);
			} catch (e) {
				store.dispatch(userSlice.actions.logout());
			}
		}
		throw error;
	}
);

export default $api;
