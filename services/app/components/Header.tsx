import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MuiLink from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function Header(): JSX.Element {
  const classes = useStyles();
  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.title}>
          Tax Policy Center, Urban Institute &amp; Brookings Institution
        </Typography>
        <nav>
          <HeaderLink href="/data" label="Data" />
          <HeaderLink href="/help" label="Help" />
          <HeaderLink href="/about" label="About" />
        </nav>
      </Toolbar>
    </AppBar>
  );
}

interface HeaderLinkProps {
  href: string;
  label: string;
}
function HeaderLink({ href, label }: HeaderLinkProps): JSX.Element {
  const classes = useStyles();
  return (
    <Link href={href} passHref={true}>
      <MuiLink color="inherit" className={classes.link}>
        {label}
      </MuiLink>
    </Link>
  );
}

export default Header;
