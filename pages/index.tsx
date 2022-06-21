import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';

import Layout from '@/components/Layout';
import Header from '@/components/Search/Header';
import Paginator, { DEFAULT_PER_PAGE } from '@/components/Search/Paginator';
import ResultList from '@/components/Search/ResultList';
import SearchForm from '@/components/Search/SearchForm';
import { useQueryState } from '@/hooks/useQueryState';
import { useAppDispatch } from '@/store';
import { searchUsers } from '@/store/search.slice';

const SearchPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const [query] = useQueryState<string>('q', 'search-page');
  const [page] = useQueryState('page');

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!query) return;
      dispatch(
        searchUsers({
          q: query,
          per_page: DEFAULT_PER_PAGE,
          page: Number(page),
        }),
      );
    }, 200);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [query, page]);

  return (
    <Layout title="Search">
      <Header />
      <SearchForm />

      <ResultList />
      <Paginator />
    </Layout>
  );
};

export default SearchPage;
