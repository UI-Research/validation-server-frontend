import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const year = new Date().getFullYear();

const useStyles = makeStyles(theme => ({
  footer: {
    background: grey[800],
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(4),
  },
}));

function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div>&copy; Urban Institute, Brookings Institution, and individual authors, {year}.</div>
    </footer>
  );
}

export default Footer;
