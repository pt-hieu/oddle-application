import styled from '@emotion/styled';
import tw from 'twin.macro';

const ResultContainer = styled.div(({hasPaginator}: {hasPaginator?: boolean}) => [
  tw`h-[calc(100vh - 164px - 72px)] dark:text-gray-600/[80]`,
  hasPaginator && tw`h-[calc(100vh - 164px - 72px - 120px)]`
]);

export default ResultContainer;
