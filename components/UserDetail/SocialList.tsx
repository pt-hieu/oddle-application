import styled from '@emotion/styled';
import tw from 'twin.macro';

import { IUser } from '@/models/user';
import Icon from '@/styles/styled-components/Icon';

import UserCell from '../UserCell';

type TProps = {
  users?: IUser[];
  loading?: boolean;
  error?: boolean;
};

export const Container = styled.div(({ center }: { center?: boolean }) => [
  tw`h-[calc(100vh - 16px - 56px - 284px - 72px - 16px)] overflow-y-auto`,
  center && tw`grid place-content-center`,
]);

export default function SocialList({ users, error, loading }: TProps) {
  return (
    <div className="!font-jost">
      {loading && <Container center>Loading...</Container>}

      {error && (
        <Container center>
          <Icon className="fa fa-warning" />
          <div className="mt-1 dark:text-gray-600/80">
            An error happens while loading data!
          </div>
        </Container>
      )}

      {!loading && !error && !users?.length && (
        <Container center>
          <Icon className="fa fa-user-group" />
          <div className="mt-1 dark:text-gray-600/80">List is empty!</div>
        </Container>
      )}

      {!loading && !error && !!users?.length && (
        <Container className="grid grid-cols-2 gap-x-2.5 gap-y-6">
          {users.map((user) => (
            <UserCell key={user.id} userData={user} />
          ))}
        </Container>
      )}
    </div>
  );
}
