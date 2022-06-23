import { useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useFirstMountState, useIsomorphicLayoutEffect } from 'react-use';

import { useQueryState } from '@/hooks/useQueryState';
import { useAppDispatch } from '@/store';
import { clearResult } from '@/store/search.slice';

type TFormPayload = {
  query: string;
};

type TProps = {};

export default function SearchForm({}: TProps) {
  const dispatch = useAppDispatch();
  const [q, setQ] = useQueryState<string>('q', 'search-form');

  const { control, handleSubmit, setValue, watch } = useForm<TFormPayload>({
    defaultValues: {
      query: '',
    },
  });

  const hasEffectRun = useRef(false);
  useEffect(() => {
    if (!q) return;
    if (hasEffectRun.current) return;

    hasEffectRun.current = true;
    setValue('query', q);
  }, [q]);

  const query = watch('query');

  const submit = useCallback(
    handleSubmit(({ query }) => {
      setQ(query);
    }),
    [],
  );

  const clearQuery = useCallback(() => {
    setValue('query', '');
    dispatch(clearResult());
  }, []);

  const isFirstMount = useFirstMountState();
  useIsomorphicLayoutEffect(() => {
    if (!query) {
      dispatch(clearResult());
    }

    if (isFirstMount) return;
    setQ(query);
  }, [query]);

  return (
    <form onSubmit={submit} className="relative py-4">
      <Controller
        control={control}
        name="query"
        render={({ field }) => (
          <input
            className="w-full placeholder:!font-jost dark:placeholder:text-white/40 dark:bg-black !font-jost p-4 border border-black-a42 dark:border-white/40 dark:focus:border-white/60 focus:border-black-a60 focus:outline-none rounded"
            placeholder="Enter GitHub username, i.e. gaearon"
            type="text"
            {...field}
          />
        )}
      />

      {!!query && (
        <button
          onClick={clearQuery}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black-a38 hover:bg-black-a60 duration-100 w-6 aspect-square"
        >
          <span className="fa fa-times text-white" />
        </button>
      )}
    </form>
  );
}
