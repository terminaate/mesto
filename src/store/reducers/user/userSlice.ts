import { AnyAction, createSlice, Draft } from '@reduxjs/toolkit';
import authAsyncThunks, { login, refresh, register } from './authAPI';
import userAsyncThunks, { editUser, getUser } from './userAPI';
import { serverURL } from '@/http';

type NullOrString = null | string

export interface UserState {
	error: NullOrString;
	authorized: boolean;
	user: {
		id: NullOrString;
		avatar: NullOrString;
		email: NullOrString;
		username: NullOrString;
		accessToken: NullOrString;
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

		for (let asyncThunk of [...userAsyncThunks, ...authAsyncThunks]) {
			builder.addCase(asyncThunk.pending, handleAuthPending);
			builder.addCase(asyncThunk.rejected, handleAuthReject);
		}

		const handleAuth = (state: Draft<UserState>, action: AnyAction) => {
			console.log(action.payload);
			state.user = {
				...action.payload.user,
				accessToken: action.payload.accessToken
			};
			state.authorized = true;
			localStorage.setItem('accessToken', state.user.accessToken!);
		};

		const getAvatar = (userId: string) => {
			return serverURL + `/static/${userId}/avatar?t=${+new Date()}`
		}

		builder.addCase(login.fulfilled, handleAuth);
		builder.addCase(register.fulfilled, handleAuth);

		builder.addCase(refresh.fulfilled, (state: Draft<UserState>, action) => {
			state.user.accessToken = action.payload.accessToken;
			state.authorized = true;
			localStorage.setItem('accessToken', state.user.accessToken!);
		});

		builder.addCase(getUser.fulfilled, (state: Draft<UserState>, action: AnyAction) => {
			state.user = { ...state.user, ...action.payload, avatar: getAvatar(state.user.id!) };
		});

		builder.addCase(editUser.fulfilled, (state: Draft<UserState>, action: AnyAction) => {
			state.user = { ...state.user, ...action.payload, avatar: getAvatar(state.user.id!) };
		});
	}
});

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
