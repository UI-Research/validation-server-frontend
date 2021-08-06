import React from 'react';
import ApiContext from '.';

interface ApiContextProviderProps {
  researcherId: number;
  token: string;
}
export interface ApiContextProviderState {
  researcherId: number;
  token: string;
}

class ApiContextProvider extends React.Component<
  ApiContextProviderProps,
  ApiContextProviderState
> {
  constructor(props: ApiContextProviderProps) {
    super(props);

    this.state = {
      researcherId: props.researcherId,
      token: props.token,
    };
  }

  render() {
    const { children } = this.props;
    return (
      <ApiContext.Provider value={this.state}>{children}</ApiContext.Provider>
    );
  }
}

export default ApiContextProvider;