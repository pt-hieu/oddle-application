import styled from '@emotion/styled';
import tw from 'twin.macro';

import { IUser } from '@/models/user';

import UserCell from '../UserCell';

type TProps = {
  users?: IUser[];
  loading?: boolean;
  error?: boolean;
};

const Container = styled.div(({ center }: { center?: boolean }) => [
  tw`h-[calc(100vh - 16px - 56px - 284px - 72px)]`,
  center && tw`grid place-content-center`,
]);

export default function SocialList({ users, error, loading }: TProps) {
  return (
    <div className="!font-jost">
      {loading && <Container center>Loading...</Container>}

      {error && (
        <Container center>
          <span className="fa fa-warning mx-auto text-black/[.54] text-2xl" />
          <div className="mt-1">Error happens while loading data!</div>
        </Container>
      )}

      {!loading && !error && !users?.length && <Container center>
        <span className="fa fa-user-group mx-auto text-black/[.54] text-2xl" />
        <div className='mt-1'>List is empty!</div>
        </Container>}

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
