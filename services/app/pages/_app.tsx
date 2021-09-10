import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import React, { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiContextProvider } from '../components/context/ApiContext';
import theme from '../styles/material-ui/theme';
import { COOKIE_TOKEN } from '../util/cookies';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Do not retry query on failed fetch.
      retry: false,
      // Do not refetch on window focus.
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Do not retry query on failed fetch.
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [key, setKey] = useState(0);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  // Refresh the app so client side styles take effect.
  // TODO: Figure out why server side styles are mismatched from client.
  // We get the "Prop `className` did not match." error for StepItem,
  // Probably due to the use of custom props in makeStyles.
  React.useEffect(() => {
    setKey(1);
  }, []);

  // NOTE: We _should_ attempt to get the token cookie server side,
  // but there is not a great way to do that using the _app component quite yet.
  // So instead, parse for cookies on the client side.
  // https://github.com/vercel/next.js/discussions/10874
  // Also note that simple client side cookies for auth tokens is
  // _not_ best practice. Further security should be fleshed out.
  // See https://maxschmitt.me/posts/next-js-http-only-cookie-auth-tokens/
  const token = useMemo(() => {
    const cookies = parseCookies();
    return cookies[COOKIE_TOKEN] || null;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ApiContextProvider token={token}>
        <ThemeProvider key={key} theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApiContextProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
