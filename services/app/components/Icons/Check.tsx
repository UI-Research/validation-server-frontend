import { makeStyles } from '@material-ui/core';
import { Check as MuiCheck } from '@material-ui/icons';

const useStlyes = makeStyles(theme => ({
  icon: {
    color: theme.palette.success.dark,
  },
}));

interface CheckProps {}
function Check({}: CheckProps): JSX.Element {
  const classes = useStlyes();
  return <MuiCheck className={classes.icon} />;
}

export default Check;
