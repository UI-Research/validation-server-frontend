import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MuiLink from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Image from 'next/image';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  logo: {
    margin: theme.spacing(3),
  },
}));

function Header(): JSX.Element {
  const classes = useStyles();
  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <div className={classes.title}>
          <Link href="/" passHref={true}>
            <a title="Home">
              <Image
                className={classes.logo}
                src="/assets/ui-logo-rgb.svg"
                alt="Tax Policy Center, Urban Institute &amp; Brookings Institution"
                width={150}
                height={90}
              />
            </a>
          </Link>
        </div>
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
      <MuiLink color="inherit" className={classes.link} title={label}>
        {label}
      </MuiLink>
    </Link>
  );
}

export default Header;
