import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IRepository } from '@/models/repository';
import { IUserWithDetails } from '@/models/user';
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
  },
});

export default userDetailSlice;
