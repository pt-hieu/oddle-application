import { useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

type TFormPayload = {
  query: string;
};

type TProps = {
  onQueryChange?: (query: string) => void | Promise<void>;
};

export default function SearchForm({ onQueryChange: emitChangeQuery }: TProps) {
  const { control, handleSubmit, setValue, watch } = useForm<TFormPayload>();

  const submit = useCallback(
    handleSubmit(({ query }) => {
      emitChangeQuery?.(query);
    }),
    [emitChangeQuery],
  );

  const clearQuery = useCallback(() => {
    setValue('query', '');
  }, []);

  const subscriptionRef = useRef<ReturnType<typeof watch>>();
  useEffect(() => {
    subscriptionRef.current?.unsubscribe();

    subscriptionRef.current = watch(() =>
      handleSubmit(({ query }) => {
        emitChangeQuery?.(query);
      }),
    );

    return () => {
      subscriptionRef.current?.unsubscribe();
    };
  }, [emitChangeQuery]);

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

      <button
        onClick={clearQuery}
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black-a38 hover:bg-black-a60 duration-100 w-6 aspect-square"
      >
        <span className="fa fa-times text-white" />
      </button>
    </form>
  );
}
