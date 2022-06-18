import type { NextPage } from 'next';
import { useState } from 'react';
import { useDebounce } from 'react-use';

import Layout from '@/components/Layout';
import Paginator, { DEFAULT_PER_PAGE } from '@/components/Search/Paginator';
import Header from '@/components/Search/Header';
import ResultList from '@/components/Search/ResultList';
import SearchForm from '@/components/Search/SearchForm';
import { useAppDispatch } from '@/store';
import { searchUsers } from '@/store/search.slice';

const SearchPage: NextPage = () => {
  const [query, setQuery] = useState('');

  const dispatch = useAppDispatch();

  const [, cancel] = useDebounce(
    () => {
      if (!query) return;
      dispatch(searchUsers({ q: query, per_page: DEFAULT_PER_PAGE }));
    },
    100,
    [query],
  );

  return (
    <Layout title="Search">
      <Header />
      <SearchForm onQueryChange={setQuery} />

      <ResultList />
      <Paginator />
    </Layout>
  );
};

export default SearchPage;
