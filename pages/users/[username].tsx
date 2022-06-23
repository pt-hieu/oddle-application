import { NextPage } from 'next';
import { ReactNode, useEffect, useMemo } from 'react';

import Layout from '@/components/Layout';
import RepoList from '@/components/UserDetail/RepoList';
import SocialList from '@/components/UserDetail/SocialList';
import Summary from '@/components/UserDetail/Summary';
import TabButton from '@/components/UserDetail/TabButton';
import UserDetailHeader from '@/components/UserDetail/UserDetailHeader';
import { useQueryState } from '@/hooks/useQueryState';
import { userUserData } from '@/hooks/useUserData';
import { useAppDispatch } from '@/store';
import {
  getFollowers,
  getFollowings,
  getRepos,
} from '@/store/userDetail.slice';

enum Tabs {
  REPOSITORIES = 'repositories',
  FOLLOWERS = 'followers',
  FOLLOWINGS = 'followings',
}

const UserDetailPage: NextPage = () => {
  let [activeTab, setActiveTab] = useQueryState<Tabs>('active_tab');
  activeTab = activeTab || Tabs.REPOSITORIES;

  const userData = userUserData();
  const dispatch = useAppDispatch();

  const {
    repos,
    followers,
    followings,
    followersLoading,
    followingsLoading,
    followersError,
    followingsError,
  } = userData || {};

  const TabRender = useMemo<Record<Tabs, ReactNode>>(
    () => ({
      [Tabs.REPOSITORIES]: <RepoList />,
      [Tabs.FOLLOWERS]: (
        <SocialList
          users={followers}
          loading={followersLoading}
          error={followersError}
        />
      ),
      [Tabs.FOLLOWINGS]: (
        <SocialList
          users={followings}
          loading={followingsLoading}
          error={followingsError}
        />
      ),
    }),
    [
      followers,
      followersLoading,
      followersError,
      followings,
      followingsLoading,
      followingsError,
    ],
  );

  useEffect(() => {
    if (!userData || !userData.user) return;

    if (!repos) {
      dispatch(getRepos(userData.user.login));
    }

    if (!followers) {
      dispatch(getFollowers(userData.user.login));
    }

    if (!followings) {
      dispatch(getFollowings(userData.user.login));
    }
  }, [userData.user]);

  return (
    <Layout title="Details" footer={false}>
      <UserDetailHeader />
      <Summary />

      <div className="grid grid-cols-3 mb-4">
        <TabButton
          onClick={() => setActiveTab(Tabs.REPOSITORIES)}
          active={activeTab === Tabs.REPOSITORIES}
        >
          {Tabs.REPOSITORIES}
          <div>({repos?.length ?? 'N_A'})</div>
        </TabButton>

        <TabButton
          active={activeTab === Tabs.FOLLOWERS}
          onClick={() => setActiveTab(Tabs.FOLLOWERS)}
        >
          {Tabs.FOLLOWERS}
          <div>({followers?.length ?? 'N_A'})</div>
        </TabButton>

        <TabButton
          active={activeTab === Tabs.FOLLOWINGS}
          onClick={() => setActiveTab(Tabs.FOLLOWINGS)}
        >
          {Tabs.FOLLOWINGS}
          <div>({followings?.length ?? 'N_A'})</div>
        </TabButton>
      </div>

      {TabRender[activeTab]}
    </Layout>
  );
};

export default UserDetailPage;
