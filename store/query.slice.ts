import {
  CaseReducer,
  PrepareAction,
  createAction,
  createSlice,
} from '@reduxjs/toolkit';

type TPrimitiveQuery = number | string;
export type TQueryValue = TPrimitiveQuery | Array<TPrimitiveQuery> | undefined;

type TQuerySlice = {
  [k in string]: TQueryValue;
};

export const setQuery =
  createAction<PrepareAction<TQuerySlice>>('query/set_query');

const querySlice = createSlice<
  TQuerySlice,
  { setQuery?: CaseReducer<TQuerySlice, TAction<TQuerySlice>> },
  'query'
>({
  name: 'query',
  initialState: {},
  reducers: {
    // setQuery(_, action) { return action.payload;
    // },
  },
  extraReducers(builder) {
    builder.addCase(setQuery, (_, action) => {
      const pl = action.payload().payload;
      console.log(action.payload().meta, pl);

      return pl;
    });
  },
});

// export const { setQuery } = querySlice.actions;

export default querySlice;
