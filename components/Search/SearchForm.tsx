import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/store';
import { clearResult, setSearchSlice } from '@/store/search.slice';

type TFormPayload = {
  query: string;
};

type TProps = {};

export default function SearchForm({}: TProps) {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, setValue, watch } = useForm<TFormPayload>();

  const query = watch('query');

  const submit = useCallback(
    handleSubmit(({ query }) => {
      dispatch(setSearchSlice({ query }));
    }),
    [],
  );

  const clearQuery = useCallback(() => {
    setValue('query', '');
    dispatch(clearResult());
  }, []);

  useEffect(() => {
    if (query) {
      dispatch(setSearchSlice({ query }));
      return;
    }

    dispatch(clearResult());
  }, [query]);

  return (
    <form onSubmit={submit} className="relative py-4">
      <Controller
        control={control}
        name="query"
        render={({ field }) => (
          <input
            className="w-full placeholder:!font-jost !font-jost p-4 border border-black-a42 focus:border-black-a60 focus:outline-none rounded"
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
