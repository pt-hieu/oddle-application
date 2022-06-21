import dynamic from 'next/dynamic';

import HeaderTitle from '@/styles/styled-components/HeaderTitle';

const DarkModeSwitch = dynamic(() => import('@/components/DarkModeSwitch'), {
  ssr: false,
});

export default function Header() {
  return (
    <div className="flex justify-between py-4 items-end">
      <HeaderTitle>Search</HeaderTitle>
      <DarkModeSwitch />
    </div>
  );
}
