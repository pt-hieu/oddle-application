import { Dispatch, useDebugValue, useEffect } from 'react';

import { useAppDispatch } from '@/store';
import { TQueryValue, setQuery } from '@/store/query.slice';

import { useEvent } from './useEvent';
import { useQuery } from './useQuery';

export function useQueryState<S extends TQueryValue>(
  name: string,
  comp?: string,
): [S | undefined, Dispatch<S | undefined>] {
  const dispatch = useAppDispatch();
  const query = useQuery();

  const hookedSetState = useEvent<Dispatch<S | undefined>>(
    (s) => {
      dispatch(setQuery({ ...query, [name]: s }));
    },
    [query],
  );

  useDebugValue(query[name]);

  return [query[name] as S, hookedSetState];
}
