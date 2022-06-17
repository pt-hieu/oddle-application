import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import GlobalStyles from '@/components/GlobalStyles';
import { store } from '@/store';
import '@/styles/globals.css';
import '@/styles/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
