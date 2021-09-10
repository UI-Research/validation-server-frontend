import { makeStyles } from '@material-ui/core';
import { Warning as MuiWarning } from '@material-ui/icons';

const useStlyes = makeStyles(theme => ({
  icon: {
    color: theme.palette.error.dark,
  },
}));

function Warning(): JSX.Element {
  const classes = useStlyes();
  return <MuiWarning className={classes.icon} />;
}

export default Warning;
