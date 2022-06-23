import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { MouseEventHandler, PropsWithChildren } from 'react';
import tw from 'twin.macro';

type TProps = {
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ActivableButton = styled.button(({ active }: { active?: boolean }) => [
  active && tw`text-primary dark:!text-primary`,
]);

export default function TabButton({
  children,
  active,
  onClick,
}: PropsWithChildren<TProps>) {
  return (
    <ActivableButton
      onClick={onClick}
      active={active}
      className="uppercase relative p-2 font-medium text-sm text-black/[.54] dark:text-gray-600"
    >
      {children}

      {active && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[3px] bg-primary"
          layoutId="tab-button-bottom-bar"
        />
      )}
    </ActivableButton>
  );
}
