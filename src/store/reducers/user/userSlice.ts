import { AnyAction, createSlice, Draft } from '@reduxjs/toolkit';
import authAsyncThunks, { login, refresh, register } from './authAPI';

export interface UserState {
	error: null | string;
	authorized: boolean;
	user: {
		id: null | number;
		avatar: null | string;
		email: null | string;
		username: null | string;
		accessToken: null | string;
	};
}

const initialState: UserState = {
	error: null,
	authorized: false,
	user: {
		id: null,
		avatar: null,
		email: null,
		username: null,
		accessToken: null
	}
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser(state, action) {
			return { ...state, ...action.payload };
		},
		logout() {
			localStorage.removeItem('accessToken');
			return initialState;
		}
	},
	extraReducers: (builder) => {
		const handleAuthReject = (state: Draft<UserState>, action: AnyAction) => {
			state.error = action.payload;
		};

		const handleAuthPending = (state: Draft<UserState>) => {
			state.error = null;
		};

		for (let asyncThunk of authAsyncThunks) {
			builder.addCase(asyncThunk.pending, handleAuthPending);
			builder.addCase(asyncThunk.rejected, handleAuthReject);
		}

		const handleAuth = (state: Draft<UserState>, action: AnyAction) => {
			state.user = {
				...action.payload.user,
				accessToken: action.payload.accessToken
			};
			state.authorized = true;
			localStorage.setItem('accessToken', state.user.accessToken!);
		};

		builder.addCase(login.fulfilled, handleAuth);
		builder.addCase(register.fulfilled, handleAuth);

		builder.addCase(refresh.fulfilled, (state: Draft<UserState>, action) => {
			state.user.accessToken = action.payload.accessToken;
			state.authorized = true;
			localStorage.setItem('accessToken', state.user.accessToken!);
		});
	}
});

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
