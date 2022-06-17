import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUserWithDetails } from '@/models/user';
import { userApi } from '@/services/user';

type TUserDetailSlice = Record<
  IUserWithDetails['login'],
  {
    user?: IUserWithDetails;
    loading: boolean;
    error: boolean;
  }
>;

export const loadUserDetail = createAsyncThunk(
  'user_detail/load_detail',
  (login: string) => {
    return userApi.getDetail(login);
  },
);

const userDetailSlice = createSlice<TUserDetailSlice, {}, 'user_detail'>({
  initialState: {},
  name: 'user_detail',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUserDetail.pending, (state, action) => {
      state[action.meta.arg] = { error: false, loading: true };
    });

    builder.addCase(loadUserDetail.rejected, (state, action) => {
      state[action.meta.arg].loading = false;
      state[action.meta.arg].error = true;
    });

    builder.addCase(loadUserDetail.fulfilled, (state, action) => {
      state[action.meta.arg].loading = false;
      state[action.meta.arg].user = action.payload;
    });
  },
});

export default userDetailSlice;
