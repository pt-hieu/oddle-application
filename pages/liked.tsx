import { NextPage } from 'next';
import { useCallback } from 'react';

import Layout from '@/components/Layout';
import UserCell from '@/components/Search/UserCell';
import { useAppSelector } from '@/store';
import HeaderTitle from '@/styles/styled-components/HeaderTitle';

const LikedPage: NextPage = () => {
  const favUsers = useAppSelector(useCallback((s) => s.favorite.users, []));

  return (
    <Layout title="Favorite">
      <div className="py-4">
        <HeaderTitle>Favorite</HeaderTitle>
      </div>

      <div className="grid grid-cols-2 gap-x-2.5 gap-y-[26px] h-[calc(100vh-60.8px-16px-72px-16px)] overflow-y-auto">
        {favUsers.map((user) => (
          <UserCell key={user.id} userData={user} />
        ))}

        {!favUsers.length && (
          <div className="col-span-2 h-full grid place-content-center">
            <span className="fa fa-user-group text-black/[.54] text-2xl mb-2 mx-auto" />

            <span className="text-center !font-jost text-sm">
              Once you like people, you'll see them here.
            </span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LikedPage;
