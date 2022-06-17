import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useSelectorBase } from 'react-redux';

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    // Since we don't have any yet, leave this empty
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
