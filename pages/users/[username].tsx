import { NextPage } from 'next';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import Layout from '@/components/Layout';
import RepoList from '@/components/UserDetail/RepoList';
import Summary from '@/components/UserDetail/Summary';
import TabButton from '@/components/UserDetail/TabButton';
import UserDetailHeader from '@/components/UserDetail/UserDetailHeader';
import { userUserData } from '@/hooks/useUserData';
import { useAppDispatch } from '@/store';
import { getRepos } from '@/store/userDetail.slice';

enum Tabs {
  REPOSITORIES = 'repositories',
  FOLLOWERS = 'followers',
  FOLLOWINGS = 'followings',
}

const UserDetailPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.REPOSITORIES);
  const userData = userUserData();

  const dispatch = useAppDispatch();

  const TabRender = useMemo<Record<Tabs, ReactNode>>(
    () => ({
      [Tabs.REPOSITORIES]: <RepoList />,
      [Tabs.FOLLOWERS]: <>v</>,
      [Tabs.FOLLOWINGS]: <>c</>,
    }),
    [],
  );

  const { repos } = userData || {};

  useEffect(() => {
    if (!userData || !userData.user) return;

    if (!userData.repos) {
      dispatch(getRepos(userData.user.login));
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
          <div>({repos?.length || 0})</div>
        </TabButton>

        <TabButton
          active={activeTab === Tabs.FOLLOWERS}
          onClick={() => setActiveTab(Tabs.FOLLOWERS)}
        >
          {Tabs.FOLLOWERS}
          <div>(0)</div>
        </TabButton>

        <TabButton
          active={activeTab === Tabs.FOLLOWINGS}
          onClick={() => setActiveTab(Tabs.FOLLOWINGS)}
        >
          {Tabs.FOLLOWINGS}
          <div>(0)</div>
        </TabButton>
      </div>

      {TabRender[activeTab]}
    </Layout>
  );
};

export default UserDetailPage;
