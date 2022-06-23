import dynamic from 'next/dynamic';
import Link from 'next/link';

const DarkModeSwitch = dynamic(() => import('@/components/DarkModeSwitch'), {
  ssr: false,
});

export default function UserDetailHeader() {
  return (
    <div className="flex py-4 justify-between items-center">
      <Link href="/">
        <a className="fa fa-home" />
      </Link>

      <DarkModeSwitch />
    </div>
  );
}
