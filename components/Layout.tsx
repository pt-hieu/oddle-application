import Head from 'next/head';
import { PropsWithChildren, useCallback, useEffect } from 'react';

import { IUserWithDetails } from '@/models/user';
import { useAppDispatch, useAppSelector } from '@/store';
import { LOCAL_STORAGE_FAVORITE_KEY, init } from '@/store/favorite.slice';

import Footer from './Footer';

type TProps = {
  title: string;
  titleTemplate?: string;
  footer?: boolean;
};

export default function Layout({
  title,
  titleTemplate = '@@ | Oddle FE Challenge',
  footer = true,
  children,
}: PropsWithChildren<TProps>) {
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

  return (
    <>
      <Head>
        <title>{titleTemplate.replace('@@', title)}</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-[clamp(428px,466px,466px)] mobile:w-[428px] tablet:w-[clamp(428px,587px,587px)] mx-auto p-4 pb-0 relative">
        <div className={`${footer ? 'h-[calc(100vh-72px-16px)]' : ''}`}>
          {children}
        </div>

        {footer && <Footer />}
      </div>
    </>
  );
}
