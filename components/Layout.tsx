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

      <div className="w-[clamp(428px,466px,466px)] mobile:w-[428px] tablet:w-[clamp(428px,587px,587px)] mx-auto p-4 pb-0">
        <div className={`${footer ? 'max-h-[calc(100vh-72px)]' : ''}`}>
          {children}
        </div>

        {footer && <Footer />}
      </div>
    </>
  );
}
