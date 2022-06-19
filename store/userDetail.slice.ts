import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IRepository } from '@/models/repository';
import { IUser, IUserWithDetails } from '@/models/user';
import { userApi } from '@/services/user';

type TUserDetailSlice = Record<
  IUserWithDetails['login'],
  {
    user?: IUserWithDetails;
    userLoading?: boolean;
    userError: boolean;

    repos?: IRepository[];
    repoLoading?: boolean;
    repoError?: boolean;

    followers: IUser[];
    followersLoading: boolean;
    followersError: boolean;

    followings: IUser[];
    followingsLoading: boolean;
    followingsError: boolean;
  }
>;

export const getUserDetail = createAsyncThunk(
  'user_detail/load_detail',
  (login: string) => {
    return userApi.getDetail(login);
  },
);

export const getRepos = createAsyncThunk(
  'user_detail/load_repos',
  (login: string) => {
    return userApi.getRepos(login);
  },
);

export const getFollowers = createAsyncThunk(
  'user_detail/load_followers',
  (login: string) => {
    return userApi.getFollowers(login);
  },
);

export const getFollowings = createAsyncThunk(
  'user_detail/load_followings',
  (login: string) => {
    return userApi.getFollowings(login);
  },
);

const userDetailSlice = createSlice<TUserDetailSlice, {}, 'user_detail'>({
  name: 'user_detail',
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserDetail.pending, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        userLoading: true,
        userError: false,
      };
    });

    builder.addCase(getUserDetail.rejected, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        userLoading: false,
        userError: true,
      };
    });

    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        userLoading: false,
        userError: false,
        user: action.payload,
      };
    });

    //=====================================================

    builder.addCase(getRepos.pending, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        repoLoading: true,
        repoError: false,
      };
    });

    builder.addCase(getRepos.rejected, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        repoLoading: false,
        repoError: true,
      };
    });

    builder.addCase(getRepos.fulfilled, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        repoLoading: false,
        repoError: false,
        repos: action.payload,
      };
    });

    //=====================================================

    builder.addCase(getFollowers.pending, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        followersLoading: true,
        followersError: false,
      };
    });

    builder.addCase(getFollowers.rejected, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        followersLoading: false,
        followersError: true,
      };
    });

    builder.addCase(getFollowers.fulfilled, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        followersLoading: false,
        followersError: false,
        followers: action.payload,
      };
    });

    //=====================================================

    builder.addCase(getFollowings.pending, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        followersLoading: true,
        followingsError: false,
      };
    });

    builder.addCase(getFollowings.rejected, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        followingsLoading: false,
        followingsError: true,
      };
    });

    builder.addCase(getFollowings.fulfilled, (state, action) => {
      state[action.meta.arg] = {
        ...state[action.meta.arg],
        followingsError: false,
        followingsLoading: false,
        followings: action.payload,
      };
    });
  },
});

export default userDetailSlice;
