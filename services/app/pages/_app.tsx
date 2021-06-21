import { ThemeProvider, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import createBaseStyles from '../styles/createBaseStyles';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={createBaseStyles(theme)} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
