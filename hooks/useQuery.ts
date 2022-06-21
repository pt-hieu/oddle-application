import { useCallback, useMemo } from 'react';

import { useQueryCtx } from '@/contexts/QueryContext';
import { useAppSelector } from '@/store';

export function useQuery() {
  const queryFromStore = useAppSelector(useCallback((s) => s.query, []));
  const queryFromContext = useQueryCtx();

  return useMemo(
    () => ({ ...queryFromContext, ...queryFromStore }),
    [queryFromContext, queryFromStore],
  );
}
