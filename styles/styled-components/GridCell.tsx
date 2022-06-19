import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const GridCell = styled.div(() => [
  tw`p-2 shadow-[0 4px 4px 0 #0000001A] rounded-lg`,
  css`
    height: fit-content;
  `,
]);

export default GridCell;
