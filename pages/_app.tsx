import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { ParsedUrlQuery } from 'querystring';
import { Provider } from 'react-redux';

import DarkModeInit from '@/components/DarkModeInit';
import FavUserHandler from '@/components/FavUserHandler';
import GlobalStyles from '@/components/GlobalStyles';
import QueryHandler from '@/components/QueryHandler';
import { QueryContext } from '@/contexts/QueryContext';
import { store } from '@/store';
import '@/styles/globals.css';
import '@/styles/tailwind.css';

function MyApp({
  Component,
  pageProps,
  query,
}: AppProps & { query: ParsedUrlQuery }) {
  return (
    <Provider store={store}>
      <QueryContext.Provider value={query}>
        <GlobalStyles />
        <FavUserHandler />

        <QueryHandler />
        <DarkModeInit />

        <Component {...pageProps} />
      </QueryContext.Provider>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const query = appContext.ctx.query;

  return { ...appProps, query };
};

export default MyApp;
