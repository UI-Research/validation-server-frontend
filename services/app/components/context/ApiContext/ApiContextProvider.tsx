import { destroyCookie, setCookie } from 'nookies';
import React from 'react';
import ApiContext from '.';
import { COOKIE_TOKEN } from '../../../util/cookies';

interface ApiContextProviderProps {
  token?: string | null;
}
export interface ApiContextProviderState {
  token: string | null;
  setToken: (val: string | null) => void;
}

class ApiContextProvider extends React.Component<
  ApiContextProviderProps,
  ApiContextProviderState
> {
  constructor(props: ApiContextProviderProps) {
    super(props);

    this.state = {
      token: props.token || null,
      setToken: this.setToken,
    };
  }

  private setToken = (val: string | null): void => {
    this.setState({ token: val });
    if (val) {
      // Set a cookie for token.
      setCookie(null, COOKIE_TOKEN, val, {
        // Let's use 1 day (60 seconds * 60 minutes * 24 hours) as max age.
        maxAge: 60 * 60 * 24,
        path: '/',
      });
    } else {
      // Destroy the cookie for token.
      destroyCookie(null, COOKIE_TOKEN);
    }
  };

  render(): JSX.Element {
    const { children } = this.props;
    return (
      <ApiContext.Provider value={this.state}>{children}</ApiContext.Provider>
    );
  }
}

export default ApiContextProvider;
