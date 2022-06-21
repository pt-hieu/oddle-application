import Image from 'next/image';
import { useCallback } from 'react';

import { useQueryState } from '@/hooks/useQueryState';
import { normalFormat } from '@/libs/format-number';
import GhLogo from '@/public/gh_logo.png';
import GhMark from '@/public/gh_mark.png';
import { useAppSelector } from '@/store';
import Icon from '@/styles/styled-components/Icon';
import ResultContainer from '@/styles/styled-components/ResultContainer';

import Defer from '../Defer';
import UserCell from '../UserCell';

export default function ResultList() {
  const { error, loading, result } = useAppSelector(
    useCallback((s) => s.searchPage, []),
  );

  const [query] = useQueryState('q');

  const { items, total_count } = result || {};

  return (
    <div className="!font-jost">
      {loading && (
        <ResultContainer className="grid place-content-center">
          Loading
        </ResultContainer>
      )}

      {error && (
        <ResultContainer className="grid place-content-center">
          Error!
        </ResultContainer>
      )}

      {result && !!result.items.length && (
        <ResultContainer hasPaginator className="overflow-y-auto">
          <div className="mb-4 text-sm">
            {normalFormat(total_count || 0)} GitHub user
            {total_count! > 1 ? 's' : ''} found
          </div>

          <div className="grid grid-cols-2 gap-x-2.5 gap-y-[26px] pb-4">
            <Defer>
              {items!.map((user) => (
                <UserCell key={user.id} userData={user} />
              ))}
            </Defer>
          </div>
        </ResultContainer>
      )}

      {result && !result.items.length && (
        <ResultContainer className="grid place-content-center text-center">
          <Icon className="fa fa-search mb-[7px] text-4xl" />

          <div className="text-sm">No search result found for</div>
          <b>{query}</b>
        </ResultContainer>
      )}

      {!result && !loading && !error && (
        <ResultContainer className="grid place-content-center">
          <div className="mx-auto">
            <Image
              placeholder="blur"
              src={GhLogo}
              width={120}
              height={120}
              layout="fixed"
              className="dark:brightness-[5]"
            />
          </div>

          <div className="mx-auto">
            <Image
              placeholder="blur"
              src={GhMark}
              width={139}
              height={57}
              layout="fixed"
              className="dark:brightness-[5]"
            />
          </div>

          <div className="text-center text-sm max-w-[285px] text-black/50 dark:text-gray-600/80">
            Enter GitHub username and search users matching the input like
            Google Search, click avatars to view more details, including
            repositories, followers and following.
          </div>
        </ResultContainer>
      )}
    </div>
  );
}
