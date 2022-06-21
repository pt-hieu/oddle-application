import { DependencyList, useCallback, useEffect, useRef } from 'react';

type TFunction = (...arg: any[]) => any;

export function useEvent<T extends TFunction = TFunction>(
  cb: T,
  deps: DependencyList,
) {
  const cbRef = useRef(cb);
  const normalCb = useCallback(cb, deps);

  useEffect(() => {
    cbRef.current = normalCb;
  }, [normalCb]);

  return useCallback<(...args: Parameters<T>) => ReturnType<T>>((...args) => {
    return cbRef.current(...args);
  }, []);
}
