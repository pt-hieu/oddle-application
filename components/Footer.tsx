import Link from 'next/link';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';

const FooterItemsData: {
  icon: string;
  label: string;
  path: string;
}[] = [
  { icon: 'fa fa-search', label: 'Search', path: '/' },
  { icon: 'fa fa-heart', label: 'Favorite', path: '/liked' },
];

const FooterItem = styled.a(({ active }: { active: boolean }) => [
  tw`grid place-content-center cursor-pointer`,
  active && tw`text-primary`,
]);

export default function Footer() {
  const { pathname } = useRouter();

  return (
    <div className="h-[72px] grid grid-cols-2 py-2 -mx-4 px-4 shadow-[0_-4px_4px_0_#0000000D] dark:shadow-[0_-4px_4px_0_#ffffff33]">
      {FooterItemsData.map(({ icon, label, path }) => (
        <Link key={label} href={path} passHref>
          <FooterItem active={path === pathname}>
            <span className={`${icon} mx-auto leading-[29px]`} />
            <div className="text-center text-xs">{label}</div>
          </FooterItem>
        </Link>
      ))}
    </div>
  );
}
