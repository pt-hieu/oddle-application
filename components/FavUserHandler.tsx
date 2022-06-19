import { useCallback, useEffect } from 'react';

import { IUserWithDetails } from '@/models/user';
import { useAppDispatch, useAppSelector } from '@/store';
import { LOCAL_STORAGE_FAVORITE_KEY, init } from '@/store/favorite.slice';

export default function FavUserHandler() {
  const favUsers = useAppSelector(useCallback((s) => s.favorite.users, []));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const favoriteData = localStorage.getItem(LOCAL_STORAGE_FAVORITE_KEY);
    let users: IUserWithDetails[] = [];

    try {
      users = JSON.parse(favoriteData || '[]');
    } catch {}

    if (!users.length) return;
    dispatch(init(users));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_KEY, JSON.stringify(favUsers));
  }, [favUsers]);
  return null;
}
