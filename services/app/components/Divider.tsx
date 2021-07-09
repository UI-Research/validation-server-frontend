import { makeStyles } from '@material-ui/core';
import MuiDivider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(5, 0),
  },
}));

interface DividerProps {}
function Divider({}: DividerProps): JSX.Element {
  const classes = useStyles();
  return <MuiDivider className={classes.divider} />;
}

export default Divider;
