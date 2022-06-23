import { CaseReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUser, IUserWithDetails } from '@/models/user';

import { TRootState } from '.';

type TFavoriteSlice = {
  users: (IUser | IUserWithDetails)[];
  initialized: boolean;
};

type TUserLogin = string;

export const LOCAL_STORAGE_FAVORITE_KEY = 'favorite';

export const like = createAsyncThunk(
  'favorite/like',
  (userLogin: TUserLogin, thunk) => {
    const root = thunk.getState() as TRootState;

    const metaData = root.userDetail[userLogin];
    const searchResults = root.searchPage.result;

    if (metaData && metaData.user) return metaData.user;

    const user = searchResults?.items.find((user) => user.login === userLogin);
    if (user) {
      return user;
    }

    return thunk.rejectWithValue('User not found');
  },
);

const favoriteSlice = createSlice<
  TFavoriteSlice,
  {
    unlike: CaseReducer<TFavoriteSlice, TAction<TUserLogin>>;
    init: CaseReducer<TFavoriteSlice, TAction<IUserWithDetails[]>>;
  },
  'favorite'
>({
  name: 'favorite',
  initialState: {
    users: [],
    initialized: false,
  },
  reducers: {
    unlike(state, action) {
      const newFavList = state.users.filter(
        (user) => user.login !== action.payload,
      );

      return {
        ...state,
        users: newFavList,
      };
    },
    init(state, action) {
      if (state.initialized) return;

      return {
        initialized: true,
        users: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(like.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
  },
});

export const { unlike, init } = favoriteSlice.actions;

export default favoriteSlice;
