import Head from 'next/head';
import { PropsWithChildren } from 'react';

import Footer from './Footer';

type TProps = {
  title: string;
  titleTemplate?: string;
  footer?: boolean;
};

export default function Layout({
  title,
  titleTemplate = '@@ | Oddle FE Challenge',
  footer = true,
  children,
}: PropsWithChildren<TProps>) {
  return (
    <>
      <Head>
        <title>{titleTemplate.replace('@@', title)}</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-[clamp(428px,466px,466px)] tablet:w-[clamp(428px,100vw,587px)] mobile:w-[clamp(280px,100vw,428px)] mx-auto p-4 pb-0 relative dark:text-white">
        <div className={`${footer ? 'h-[calc(100vh-72px-16px)]' : ''}`}>
          {children}
        </div>

        {footer && <Footer />}
      </div>
    </>
  );
}
