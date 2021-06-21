import '@emotion/react';
import { Theme } from './styles/theme';

interface MyTheme extends Theme {}

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
