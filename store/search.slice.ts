import { CaseReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TSearchParams, TSearchResponse, userApi } from '@/services/user';

type TSearchPageSlice = {
  result?: TSearchResponse;
  query: string;
  loading: boolean;
  error: boolean;
};

type TSearchPageSliceKeys = keyof TSearchPageSlice;
type TSearchPageSliceValues = TSearchPageSlice[TSearchPageSliceKeys];

export const searchUsers = createAsyncThunk(
  'search_page/search_users',
  (params: TSearchParams) => {
    return userApi.search(params);
  },
);

const searchPageSlice = createSlice<
  TSearchPageSlice,
  {
    setSearchSlice: CaseReducer<
      TSearchPageSlice,
      TAction<Partial<TSearchPageSlice>>
    >;
    clearResult: CaseReducer<TSearchPageSlice>;
  },
  'search_page'
>({
  name: 'search_page',
  initialState: {
    error: false,
    loading: false,
    query: '',
  },
  reducers: {
    setSearchSlice(state, action) {
      Object.entries(action.payload).forEach(([key, value]) => {
        (state[key as TSearchPageSliceKeys] as TSearchPageSliceValues) = value;
      });
    },
    clearResult(state) {
      state.result = undefined;
      state.loading = false;
      state.error = false;
      state.query = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(searchUsers.pending, (state) => {
      state.loading = true;
      state.result = undefined;
    });

    builder.addCase(searchUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.result = action.payload;
    });
  },
});

export const { clearResult, setSearchSlice } = searchPageSlice.actions;

export default searchPageSlice;
