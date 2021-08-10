import { makeStyles } from '@material-ui/core';
import { Warning as MuiWarning } from '@material-ui/icons';

const useStlyes = makeStyles(theme => ({
  icon: {
    color: theme.palette.error.dark,
  },
}));

interface WarningProps {}
function Warning({}: WarningProps): JSX.Element {
  const classes = useStlyes();
  return <MuiWarning className={classes.icon} />;
}

export default Warning;
