import { AnyAction, createSlice, Draft } from '@reduxjs/toolkit';
import authAsyncThunks, { login, logout, refresh, register } from './authAPI';
import userAsyncThunks, { createPost, deletePost, editUser, getUser, getUserPosts, likePost } from './userAPI';
import userAvatar from '@/utils/userAvatar';
import { PostProps } from '@/types/Post';
import History from '@/utils/history';

type NullOrString = null | string;

export interface UserState {
  error: NullOrString;
  authorized: boolean;
  user: {
    id: NullOrString;
    avatar: NullOrString;
    email: NullOrString;
    username: NullOrString;
    posts: PostProps[];
    accessToken: NullOrString;
  };
}

export const initialState: UserState = {
  error: null,
  authorized: false,
  user: {
    id: null,
    avatar: null,
    email: null,
    username: null,
    posts: [] as PostProps[],
    accessToken: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    const handleReject = (state: Draft<UserState>, action: AnyAction) => {
      state.error = action.payload;
    };

    const handlePending = (state: Draft<UserState>) => {
      state.error = null;
    };

    for (const asyncThunk of [...userAsyncThunks, ...authAsyncThunks]) {
      builder.addCase(asyncThunk.pending, handlePending);
      builder.addCase(asyncThunk.rejected, handleReject);
    }

    const handleAuth = (state: Draft<UserState>, action: AnyAction) => {
      state.user = {
        ...action.payload.user,
        accessToken: action.payload.accessToken,
        avatar: userAvatar(action.payload.user.id),
      };
      state.authorized = true;
      localStorage.setItem('accessToken', state.user.accessToken!);
    };

    const handleLogout = () => {
      History.push('/login');
      return initialState;
    };

    builder.addCase(login.fulfilled, handleAuth);
    builder.addCase(register.fulfilled, handleAuth);

    builder.addCase(refresh.fulfilled, (state: Draft<UserState>, action) => {
      state.user.accessToken = action.payload.accessToken;
      state.authorized = true;
      localStorage.setItem('accessToken', state.user.accessToken!);
    });
    builder.addCase(refresh.pending, handlePending);
    builder.addCase(refresh.rejected, (state: Draft<UserState>, action) => {
      handleReject(state, action);
      if (!state.authorized || !state.user.accessToken) {
        handleLogout();
      }
    });

    builder.addCase(getUser.fulfilled, (state: Draft<UserState>, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
        avatar: userAvatar(action.payload.id),
      };
    });

    builder.addCase(editUser.fulfilled, (state: Draft<UserState>, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
        avatar: userAvatar(action.payload.id),
      };
    });

    builder.addCase(createPost.fulfilled, (state: Draft<UserState>, action) => {
      state.user.posts = [
        action.payload,
        ...state.user.posts,
      ];
    });

    builder.addCase(
      getUserPosts.fulfilled,
      (state: Draft<UserState>, action) => {
        state.user.posts = action.payload;
      },
    );

    builder.addCase(likePost.fulfilled, (state: Draft<UserState>, action) => {
      const postIndex = state.user.posts.findIndex(
        (post) => post.id === action.payload.id!,
      );
      state.user.posts[postIndex].likes = action.payload.likes;
    });

    builder.addCase(deletePost.fulfilled, (state: Draft<UserState>, action) => {
      state.user.posts = state.user.posts.filter(
        (post) => post.id !== action.payload.id,
      );
    });

    builder.addCase(logout.fulfilled, handleLogout);
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
