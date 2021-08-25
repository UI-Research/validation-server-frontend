import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiContextProvider } from '../components/context/ApiContext';
import theme from '../styles/material-ui/theme';

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
const token = process.env.NEXT_PUBLIC_API_TOKEN;

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

  return (
    <QueryClientProvider client={queryClient}>
      <ApiContextProvider token={token || ''}>
        <ThemeProvider key={key} theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApiContextProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
