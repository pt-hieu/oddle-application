import { userUserData } from '@/hooks/useUserData';

import RepoCell from './RepoCell';

export default function RepoList() {
  const { repos, repoLoading, repoError } = userUserData();

  return (
    <div>
      {!repoLoading && !repoError && !!repos?.length && (
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-6">
          {repos.map((repo) => (
            <RepoCell repoData={repo} key={repo.id} />
          ))}
        </div>
      )}
    </div>
  );
}
