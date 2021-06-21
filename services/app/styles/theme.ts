const theme = {
  // TODO: Set proper theme object config.
  palette: {
    blue: {
      base: 'steelblue',
    },
  },
};

export type Theme = typeof theme;

export interface ThemeProps {
  theme: Theme;
}

export default theme;
