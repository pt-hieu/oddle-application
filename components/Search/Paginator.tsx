import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFirstMountState } from 'react-use';
import tw from 'twin.macro';

import { useAppDispatch, useAppSelector } from '@/store';
import { searchUsers } from '@/store/search.slice';

export const DEFAULT_PER_PAGE = 12;
export const MAX_PAGE_BUTTON = 6;
const PIVOT_PAGE = 3;

const NavButton = styled.button(() => [
  tw`disabled:text-black-a38 w-[34px] h-[34px] rounded-full duration-100`,
  css`
    box-shadow: 0px 1px 5px 0px #0000001f;
    box-shadow: 0px 2px 2px 0px #00000024;
    box-shadow: 0px 1px 1px 0px #00000033;
  `,
]);

const PageButton = styled.button(({ active }: { active?: boolean }) => [
  tw`!font-roboto text-black/[.87] w-[34px] h-[34px] rounded duration-100`,
  active && tw`bg-primary text-white`,
  css`
    box-shadow: 0px 1px 5px 0px #0000001f;
    box-shadow: 0px 2px 2px 0px #00000024;
    box-shadow: 0px 1px 1px 0px #00000033;
  `,
]);

export default function Paginator() {
  const isFirstMount = useFirstMountState();

  const dispatch = useAppDispatch();
  const { result, query } = useAppSelector(
    useCallback((s) => s.searchPage, []),
  );

  const [currentPage, setCurrentPage] = useState(1);

  const total_count = result?.total_count || 0;
  const pageCount = useMemo(
    () => Math.ceil(total_count / DEFAULT_PER_PAGE),
    [total_count],
  );

  const pageToDisplay = useMemo(
    () => Math.min(pageCount, MAX_PAGE_BUTTON),
    [pageCount],
  );

  const keys = useMemo(
    () =>
      Array(pageToDisplay)
        .fill('')
        .map(() => Math.random().toString()),
    [pageToDisplay],
  );

  useEffect(() => {
    if (isFirstMount) return;

    dispatch(
      searchUsers({ q: query, per_page: DEFAULT_PER_PAGE, page: currentPage }),
    );
  }, [currentPage]);

  useEffect(() => {
    if (isFirstMount) return;
    setCurrentPage(1);
  }, [query]);

  const shouldTranslatePage = currentPage > PIVOT_PAGE;

  if (!result || pageCount <= 1) return null;
  return (
    <div className="h-[120px] grid place-content-center">
      <div className="flex gap-4">
        <NavButton
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage <= 1}
        >
          <span className="fa fa-angle-left" />
        </NavButton>

        <div className="flex gap-2.5">
          {keys.map((key, index) => {
            const page =
              index + 1 + (shouldTranslatePage ? currentPage - PIVOT_PAGE : 0);

            return (
              <PageButton
                key={key}
                onClick={() => setCurrentPage(page)}
                active={page === currentPage}
              >
                {page}
              </PageButton>
            );
          })}
        </div>

        <NavButton
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= pageCount}
        >
          <span className="fa fa-angle-right" />
        </NavButton>
      </div>
    </div>
  );
}
