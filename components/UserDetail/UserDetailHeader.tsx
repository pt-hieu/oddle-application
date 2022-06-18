import Link from 'next/link';

export default function UserDetailHeader() {
  return (
    <div className="flex py-4 justify-between items-center">
      <Link href="/">
        <a className="fa fa-home"></a>
      </Link>

      <div>switch go here</div>
    </div>
  );
}
