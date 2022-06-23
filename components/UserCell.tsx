import Link from 'next/link';
import { memo, useCallback, useEffect } from 'react';

import { useQueryState } from '@/hooks/useQueryState';
import { compactFormat } from '@/libs/format-number';
import { IUser } from '@/models/user';
import { useAppDispatch, useAppSelector } from '@/store';
import { like, unlike } from '@/store/favorite.slice';
import { getUserDetail } from '@/store/userDetail.slice';
import GridCell from '@/styles/styled-components/GridCell';

import CustomImage from './CustomImage';

type TProps = {
  userData: IUser;
};

export default memo(function UserCell({ userData }: TProps) {
  const { login, avatar_url } = userData;

  const isFavorite = useAppSelector(
    useCallback(
      (s) => s.favorite.users.some((user) => user.login === login),
      [login],
    ),
  );

  const [query] = useQueryState<string>('q');

  const dispatch = useAppDispatch();
  const details = useAppSelector(
    useCallback((s) => s.userDetail[login], [login]),
  );

  useEffect(() => {
    if (details) return;
    // dispatch(getUserDetail(login));
  }, [details]);

  const addFavorite = useCallback(() => {
    dispatch(like(login));
  }, [login]);

  const removeFavorite = useCallback(() => {
    dispatch(unlike(login));
  }, [login]);

  return (
    <GridCell className="grid grid-cols-[64px,1fr,16px] gap-x-2.5">
      <Link href={`/users/${login}`} passHref>
        <a>
          <CustomImage
            className="rounded w-16 aspect-square"
            src={avatar_url}
            alt={`${login}'s avatar`}
          />
        </a>
      </Link>

      <div className="truncate">
        <div title={login} className="mb-2.5 truncate">
          <b>{query}</b>
          {login.replace(query || '', '')}
        </div>

        <div className="text-xs">
          {details?.user && (
            <>
              <div>{compactFormat(details.user.following)} followings</div>
              <div>{compactFormat(details.user.followers)} followers</div>
            </>
          )}

          {details?.userLoading && <div>Loading...</div>}

          {details?.userError && (
            <div
              title="Failed to fetch data of this user!"
              className="fa fa-warning"
            />
          )}
        </div>
      </div>

      <div className="text-red-oddle">
        {isFavorite && (
          <button onClick={removeFavorite}>
            <span className="fa-solid fa-heart"></span>
          </button>
        )}

        {!isFavorite && (
          <button onClick={addFavorite}>
            <span className="fa-regular fa-heart"></span>
          </button>
        )}
      </div>
    </GridCell>
  );
});
