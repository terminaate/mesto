import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService, { AuthData } from '@/services/AuthService';
import { logError } from '@/store/reducers/user/userAPI';

export const login = createAsyncThunk(
	'auth/login',
	async (loginData: AuthData, thunkAPI) => {
		try {
			const { data } = await AuthService.login(loginData);
			return data;
		} catch (e: any) {
			logError(e);
			return thunkAPI.rejectWithValue(e.response?.data.message[0]);
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (registerData: AuthData, thunkAPI) => {
		try {
			const { data } = await AuthService.register(registerData);
			return data;
		} catch (e: any) {
			logError(e);
			return thunkAPI.rejectWithValue(e.response?.data.message[0]);
		}
	}
);

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
	try {
		const { data } = await AuthService.refresh();
		return data;
	} catch (e: any) {
		logError(e);
		return thunkAPI.rejectWithValue(e.response?.data.message[0]);
	}
});

export default [login, register, refresh];
