import { NextPage } from 'next';

import Layout from '@/components/Layout';
import HeaderTitle from '@/styles/styled-components/HeaderTitle';

const LikedPage: NextPage = () => {
  return (
    <Layout title="Favorite">
      <div className="py-4">
        <HeaderTitle>Favorite</HeaderTitle>
      </div>
    </Layout>
  );
};

export default LikedPage;
