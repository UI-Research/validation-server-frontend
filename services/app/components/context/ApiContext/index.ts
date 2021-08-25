import { createContext } from 'react';

import ApiContextProvider, {
  ApiContextProviderState,
} from './ApiContextProvider';

export type ApiContextType = ApiContextProviderState;

const ApiContext = createContext<ApiContextType>({
  token: '',
});

const { Consumer } = ApiContext;

export { Consumer as ApiContextConsumer, ApiContextProvider };
export default ApiContext;
