import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { getUserDetail } from '@/store/userDetail.slice';

type TUserLogin = string;

export function userUserData(login?: TUserLogin) {
  const { query } = useRouter();
  login = login || (query.username as string) || '';

  const dispatch = useAppDispatch();

  const user = useAppSelector(
    useCallback((s) => s.userDetail[login!], [login]),
  );

  useEffect(() => {
    if (user) return;
    dispatch(getUserDetail(login!));
  }, [user, login]);

  return user || {};
}
