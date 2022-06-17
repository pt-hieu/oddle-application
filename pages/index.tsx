import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import Layout from '@/components/Layout';
import Header from '@/components/Search/Header';
import ResultList from '@/components/Search/ResultList';
import SearchForm from '@/components/Search/SearchForm';
import { useAppDispatch } from '@/store';
import { clearResult, searchUsers } from '@/store/search.slice';

const SearchPage: NextPage = () => {
  const [query, setQuery] = useState('');

  const dispatch = useAppDispatch();

  const [, cancel] = useDebounce(
    () => {
      if (!query) return;
      dispatch(searchUsers({ q: query, per_page: 12 }));
    },
    100,
    [query],
  );

  // useEffect(() => {
  //   if (query) return;

  //   cancel();
  //   dispatch(clearResult());
  // }, [query])

  return (
    <Layout title="Search">
      <Header />
      <SearchForm onQueryChange={setQuery} />
      <ResultList />
    </Layout>
  );
};

export default SearchPage;
