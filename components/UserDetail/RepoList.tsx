import { userUserData } from '@/hooks/useUserData';
import Icon from '@/styles/styled-components/Icon';

import Defer from '../Defer';
import RepoCell from './RepoCell';
import { Container } from './SocialList';

export default function RepoList() {
  const { repos, repoLoading, repoError } = userUserData();

  return (
    <div>
      {repoLoading && <Container center>Loading...</Container>}

      {repoError && (
        <Container center>
          <Icon className="fa fa-warning" />
          <div className="mt-1 dark:text-gray-600/80">
            An error happens while loading data!
          </div>
        </Container>
      )}

      {!repoLoading && !repoError && !repos?.length && (
        <Container center>
          <Icon className="fa fa-user-group" />
          <div className="mt-1 dark:text-gray-600/80">List is empty!</div>
        </Container>
      )}

      {!repoLoading && !repoError && !!repos?.length && (
        <Container className="grid grid-cols-2 gap-x-2.5 gap-y-6">
          <Defer>
            {repos.map((repo) => (
              <RepoCell repoData={repo} key={repo.id} />
            ))}
          </Defer>
        </Container>
      )}
    </div>
  );
}
