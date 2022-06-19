import type { NextPage } from 'next';
import { useCallback, useEffect, useRef } from 'react';

import Layout from '@/components/Layout';
import Header from '@/components/Search/Header';
import Paginator, { DEFAULT_PER_PAGE } from '@/components/Search/Paginator';
import ResultList from '@/components/Search/ResultList';
import SearchForm from '@/components/Search/SearchForm';
import { useAppDispatch, useAppSelector } from '@/store';
import { searchUsers } from '@/store/search.slice';

const SearchPage: NextPage = () => {
  const query = useAppSelector(useCallback((s) => s.searchPage.query, []));
  const dispatch = useAppDispatch();

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!query) return;
      dispatch(searchUsers({ q: query, per_page: DEFAULT_PER_PAGE }));
    }, 200);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [query]);

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
