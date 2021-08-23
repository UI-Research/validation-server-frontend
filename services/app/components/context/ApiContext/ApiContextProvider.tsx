import React from 'react';
import ApiContext from '.';

interface ApiContextProviderProps {
  researcherId: number;
  token?: string | null;
}
export interface ApiContextProviderState {
  researcherId: number;
  token: string | null;
  setToken: (val: string) => void;
}

class ApiContextProvider extends React.Component<
  ApiContextProviderProps,
  ApiContextProviderState
> {
  constructor(props: ApiContextProviderProps) {
    super(props);

    this.state = {
      researcherId: props.researcherId,
      token: props.token || null,
      setToken: this.setToken,
    };
  }

  private setToken = (val: string): void => {
    this.setState({ token: val });
  };

  render() {
    const { children } = this.props;
    return (
      <ApiContext.Provider value={this.state}>{children}</ApiContext.Provider>
    );
  }
}

export default ApiContextProvider;
