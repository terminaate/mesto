import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService, { AuthData } from '@/services/AuthService';
import { getErrorObject, logError } from '@/store/reducers/user/userAPI';

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: AuthData, thunkAPI) => {
    try {
      const { data } = await AuthService.login(loginData);
      return data;
    } catch (e: any) {
      logError(e);
      return thunkAPI.rejectWithValue(getErrorObject(e).message);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: AuthData, thunkAPI) => {
    try {
      const { data } = await AuthService.register(registerData);
      return data;
    } catch (e: any) {
      logError(e);
      return thunkAPI.rejectWithValue(getErrorObject(e).message);
    }
  },
);

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const { data } = await AuthService.refresh();
    return data;
  } catch (e: any) {
    logError(e);
    return thunkAPI.rejectWithValue(getErrorObject(e).message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await AuthService.logout().then(() => {
      localStorage.removeItem('accessToken');
    });
  } catch (e: any) {
    logError(e);
    return thunkAPI.rejectWithValue(getErrorObject(e).message);
  }
});

export default [login, register, logout];
