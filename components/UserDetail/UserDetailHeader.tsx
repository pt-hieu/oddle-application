import Link from 'next/link';

import DarkModeSwitch from '../DarkModeSwitch';

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
