import { makeStyles } from '@material-ui/core';
import { Check as MuiCheck } from '@material-ui/icons';

const useStlyes = makeStyles(theme => ({
  icon: {
    color: theme.palette.success.dark,
  },
}));

function Check(): JSX.Element {
  const classes = useStlyes();
  return <MuiCheck className={classes.icon} />;
}

export default Check;
