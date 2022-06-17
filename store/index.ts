import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useSelectorBase } from 'react-redux';

import searchPageSlice from './search.slice';
import userDetailSlice from './userDetail.slice';

export const store = configureStore({
  reducer: {
    searchPage: searchPageSlice.reducer,
    userDetail: userDetailSlice.reducer,
  },
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector = <TSelected = unknown>(
  selector: (state: TRootState) => TSelected,
): TSelected => useSelectorBase<TRootState, TSelected>(selector);

declare global {
  export type TAction<T> = {
    type: string;
    payload: T;
  };
}
