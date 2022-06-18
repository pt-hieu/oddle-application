import { memo, useCallback, useEffect } from 'react';

import { IUser } from '@/models/user';
import { useAppDispatch, useAppSelector } from '@/store';
import { like, unlike } from '@/store/favorite.slice';
import { loadUserDetail } from '@/store/userDetail.slice';

type TProps = {
  userData: IUser;
};

const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
}).format;

export default memo(function UserCell({ userData }: TProps) {
  const query = useAppSelector(useCallback((s) => s.searchPage.query, []));

  const isFavorite = useAppSelector(
    useCallback(
      (s) => s.favorite.users.some((user) => user.login === userData.login),
      [userData.login],
    ),
  );

  const { login, avatar_url } = userData;

  const dispatch = useAppDispatch();
  const details = useAppSelector(
    useCallback((s) => s.userDetail[userData.login], [userData.login]),
  );

  useEffect(() => {
    if (details) return;
    dispatch(loadUserDetail(userData.login));
  }, [details]);

  const addFavorite = useCallback(() => {
    dispatch(like(userData.login));
  }, [userData.login]);

  const removeFavorite = useCallback(() => {
    dispatch(unlike(userData.login));
  }, [userData.login]);

  return (
    <div className="p-2 shadow-[0_4px_4px_0_#0000001A] rounded-lg grid grid-cols-[64px,1fr,16px] gap-x-2.5">
      <img
        className="rounded w-16 aspect-square"
        src={avatar_url}
        alt={`${login}'s avatar`}
      />

      <div className="truncate">
        <div title={login} className="mb-2.5 truncate">
          <b>{query}</b>
          {login.replace(query, '')}
        </div>

        <div className="text-xs">
          {details?.user && (
            <>
              <div>{formatter(details.user.following)} followings</div>
              <div>{formatter(details.user.followers)} followers</div>
            </>
          )}

          {details?.loading && <div>Loading...</div>}
          {details?.error && (
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
    </div>
  );
});
