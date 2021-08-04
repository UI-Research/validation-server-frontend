import { createContext } from 'react';

import ApiContextProvider, {
  ApiContextProviderState,
} from './ApiContextProvider';

export interface ApiContextType extends ApiContextProviderState {}

const ApiContext = createContext<ApiContextType>({
  researcherId: 0,
  token: '',
});

const { Consumer } = ApiContext;

export { Consumer as ApiContextConsumer, ApiContextProvider };
export default ApiContext;
