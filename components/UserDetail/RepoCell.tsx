import { memo } from 'react';

import { compactFormat } from '@/libs/format-number';
import { IRepository } from '@/models/repository';
import GridCell from '@/styles/styled-components/GridCell';

type TProps = {
  repoData: IRepository;
};

export default memo(function RepoCell({ repoData }: TProps) {
  const { name, forks, stargazers_count } = repoData;

  return (
    <GridCell className="!h-[80px] !font-jost">
      <div className="font-bold mb-2.5 truncate">{name}</div>

      <div className="text-xs">
        {!!stargazers_count && (
          <div>
            {compactFormat(stargazers_count)} star{stargazers_count > 1 ? 's' : ''}
          </div>
        )}

        {!!forks && (
          <div>
            {compactFormat(forks)} fork{forks > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </GridCell>
  );
});
