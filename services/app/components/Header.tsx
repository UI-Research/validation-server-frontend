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
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 400 240" width="150" height="90">
                <defs>
                  <style>{`.cls-1{fill:none}.cls-2{fill:#231f20}.cls-3{fill:#1696d2}.cls-4{fill:#9d9fa2}`}</style>
                </defs>
                <path className="cls-1" d="M0 0h400v240H0z" />
                <path className="cls-2" d="M133.62 127.86h5.14V142h-5.14ZM156 127.86h4.94l4.62 7.86h.15a22.09 22.09 0 0 1-.43-3.61v-4.25h4.92V142h-4.92l-4.53-7.44h-.14a16.55 16.55 0 0 1 .31 2.84v4.6H156ZM185.54 137l.26.2a5.37 5.37 0 0 0 3.21 1.3c.51 0 1.32-.21 1.32-.84s-.68-.7-1.15-.79l-1-.19c-2-.36-3.7-1.54-3.7-3.76 0-3.36 3.06-5.24 6.14-5.24a8.4 8.4 0 0 1 4.49 1.24l-1.39 3.63a5.29 5.29 0 0 0-3-1.08c-.45 0-1.1.17-1.1.76s.63.6 1 .69l1.16.26c2.18.49 3.76 1.66 3.76 4.06 0 3.38-3.08 5.05-6.14 5.05A12.72 12.72 0 0 1 184 141ZM211.49 127.86h10.82v4.61l-2.84-.13V142h-5.14v-9.69l-2.84.13ZM240.29 127.86h5.14V142h-5.14ZM263.72 127.86h10.82v4.61l-2.84-.13V142h-5.14v-9.69l-2.84.13ZM303.29 127.86v8.38c0 4.14-2.6 6-6.56 6s-6.56-1.87-6.56-6v-8.38h5.15v7.9c0 1.1 0 2.08 1.41 2.08s1.41-1 1.41-2.08v-7.9ZM317.05 127.86h10.82v4.61l-2.84-.13V142h-5.14v-9.69l-2.84.13ZM344.61 127.86h9.53v3.88h-4.34v1.35h4v3.68h-4v1.39h4.49V142h-9.68Z" />
                <path className="cls-3" d="M138.82 68v25.4c0 12.54-7.86 18.23-19.88 18.23s-19.88-5.69-19.88-18.23V68h15.61v23.89c0 3.36.11 6.33 4.27 6.33s4.27-3 4.27-6.33V68ZM155.09 68h18.85c9.68 0 17.89 4.1 17.89 14.92 0 6.5-2.51 9.23-8.32 11.17v.34a10.93 10.93 0 0 1 2.62 2.57l9.34 14h-18l-6.83-13.79h-.29V111h-15.26Zm15.26 19h1.08c2.57 0 5.13-.4 5.13-3.59s-2.33-3.7-5-3.7h-1.2ZM207.41 68h18.18c8.31 0 16.8 2 16.8 11.9 0 3.76-1.88 7.47-5.64 8.66v.34c4.67 1.66 7.63 5.07 7.63 10.2 0 8.83-8.2 11.85-15.72 11.85h-21.25Zm15.9 16.52c2.28 0 4.84-.23 4.84-3.19 0-3.19-2.91-3-5.19-3h-1.08v6.16Zm-1.43 16.18h1.77c2.56 0 6.27-.06 6.27-3.59s-4-3.54-6.5-3.54h-1.54ZM269.83 110.92h-16.52L268.23 68h17.26l15.33 43H284.3l-1.43-5.36h-11.78Zm10.31-15.55-1.82-7.58c-.46-1.82-.74-3.7-1-5.53h-.57l-2.84 13.11ZM311.15 68h15l14 23.81h.45a65.1 65.1 0 0 1-1.31-10.94V68h14.93v43h-14.93l-13.73-22.64h-.45a50.58 50.58 0 0 1 1 8.6v14h-14.96Z"/>
                <path className="cls-4" d="M213.53 213.14h4.44v4.44h-4.44zM186.86 213.14h4.44v4.44h-4.44zM106.86 213.14h4.44v4.44h-4.44zM133.53 213.14h4.44v4.44h-4.44zM160.2 213.14h4.44v4.44h-4.44zM80.2 213.14h4.44v4.44H80.2zM53.53 213.14h4.44v4.44h-4.44zM26.86 213.14h4.44v4.44h-4.44zM186.86 53.14h4.44v4.44h-4.44zM213.53 53.14h4.44v4.44h-4.44zM106.86 53.14h4.44v4.44h-4.44zM133.53 53.14h4.44v4.44h-4.44zM160.2 53.14h4.44v4.44h-4.44zM80.2 53.14h4.44v4.44H80.2zM186.86 159.81h4.44v4.44h-4.44zM213.53 159.81h4.44v4.44h-4.44zM106.86 159.81h4.44v4.44h-4.44zM133.53 159.81h4.44v4.44h-4.44zM160.2 159.81h4.44v4.44h-4.44zM80.2 159.81h4.44v4.44H80.2zM80.2 133.14h4.44v4.44H80.2zM80.2 106.47h4.44v4.44H80.2zM80.2 79.81h4.44v4.44H80.2z"/>
                <path className="cls-4" d="M160.2 53.14h4.44v4.44h-4.44zM186.86 53.14h4.44v4.44h-4.44zM213.53 53.14h4.44v4.44h-4.44zM80.2 53.14h4.44v4.44H80.2zM106.86 53.14h4.44v4.44h-4.44zM133.53 53.14h4.44v4.44h-4.44zM53.53 53.14h4.44v4.44h-4.44zM53.53 159.81h4.44v4.44h-4.44zM53.53 133.14h4.44v4.44h-4.44zM53.53 106.47h4.44v4.44h-4.44zM53.53 79.81h4.44v4.44h-4.44z" />
                <path className="cls-4" d="M133.53 53.14h4.44v4.44h-4.44zM160.2 53.14h4.44v4.44h-4.44zM186.86 53.14h4.44v4.44h-4.44zM213.53 53.14h4.44v4.44h-4.44zM53.53 53.14h4.44v4.44h-4.44zM80.2 53.14h4.44v4.44H80.2zM106.86 53.14h4.44v4.44h-4.44zM186.86 186.47h4.44v4.44h-4.44zM213.53 186.47h4.44v4.44h-4.44zM106.86 186.47h4.44v4.44h-4.44zM133.53 186.47h4.44v4.44h-4.44zM160.2 186.47h4.44v4.44h-4.44zM80.2 186.47h4.44v4.44H80.2zM53.53 186.47h4.44v4.44h-4.44zM26.86 53.14h4.44v4.44h-4.44zM26.86 159.81h4.44v4.44h-4.44zM26.86 186.47h4.44v4.44h-4.44zM26.86 133.14h4.44v4.44h-4.44zM26.86 106.47h4.44v4.44h-4.44zM26.86 79.81h4.44v4.44h-4.44zM106.86 133.14h4.44v4.44h-4.44zM186.86 26.47h4.44v4.44h-4.44zM213.53 26.47h4.44v4.44h-4.44zM106.86 26.47h4.44v4.44h-4.44zM133.53 26.47h4.44v4.44h-4.44zM160.2 26.47h4.44v4.44h-4.44zM80.2 26.47h4.44v4.44H80.2zM53.53 26.47h4.44v4.44h-4.44zM26.86 26.47h4.44v4.44h-4.44z" />
              </svg>
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
