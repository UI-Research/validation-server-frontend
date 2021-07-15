import { grey, red } from '@material-ui/core/colors';
// Need to use Strict Mode Theme, else we get a bunch of warnings/errors when using Popover.
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[300],
    },
  },
});

export default theme;
