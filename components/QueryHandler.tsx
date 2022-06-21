import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { stringify } from 'query-string';
import { useCallback, useEffect } from 'react';

import { useQueryCtx } from '@/contexts/QueryContext';
import { useAppDispatch, useAppSelector } from '@/store';
import { setQuery } from '@/store/query.slice';

type TProps = {};

export default function QueryHandler({}: TProps) {
  const { pathname, push } = useRouter();
  const queryFromContext = useQueryCtx();

  const dispatch = useAppDispatch();
  const queryFromStore = useAppSelector(useCallback((s) => s.query, []));

  useEffect(() => {
    dispatch(
      setQuery(() => ({
        payload: { ...queryFromContext },
        meta: {
          from: 'query-handler',
        },
      })),
    );
  }, [queryFromContext]);

  useEffect(() => {
    const clonedQuery = cloneDeep(queryFromStore);

    Object.entries(clonedQuery).forEach(([key, value]) => {
      if (!value) {
        delete clonedQuery[key];
        return;
      }

      if (Array.isArray(value) && !value.length) {
        delete clonedQuery[key];
        return;
      }
    });

    push({ pathname, query: stringify(clonedQuery) }, undefined, {
      shallow: true,
    });
  }, [queryFromStore]);

  return null;
}
