import { Grid, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import Divider from '../Divider';
import Paragraph from '../Paragraph';
import SignInForm from './SignInForm';

const useClasses = makeStyles(() => ({
  text: {
    fontSize: '1.6rem',
  },
}));

const WelcomeItem: FC = ({ children }) => {
  const classes = useClasses();
  return (
    <Grid item={true} md={true}>
      <Typography className={classes.text} align="center">
        {children}
      </Typography>
    </Grid>
  );
};

function Welcome(): JSX.Element {
  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom={true}>
        Welcome to the Validation Server
      </Typography>
      <Grid
        container={true}
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
      >
        <WelcomeItem>Access confidential tax data</WelcomeItem>
        <WelcomeItem>Retain privacy</WelcomeItem>
        <WelcomeItem>Improve your research</WelcomeItem>
      </Grid>
      <Divider />
      <Grid
        container={true}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item={true} sm={6}>
          <Typography style={{ fontSize: '1.8rem' }}>
            Ready to start? Enter your credentials, or keep reading to learn
            more about this service.
          </Typography>
        </Grid>
        <Grid item={true} sm={6}>
          <SignInForm />
        </Grid>
      </Grid>
      <Divider />
      <div>
        <Typography variant="h3" gutterBottom={true}>
          How the Validation Server works
        </Typography>
        <Typography variant="h4">What it is</Typography>
        <Paragraph>
          Proin repellat. Hac risus, eaque fugit fames numquam aliquip sed
          corporis nostrum, blanditiis placerat vestibulum, orci urna nostrum
          vel nostra, feugiat, beatae iure aute! Proin totam pariatur ratione?
          Aptent cumque laoreet id repellat scelerisque feugiat platea? Mollitia
          cubilia aenean, urna.
        </Paragraph>
        <Typography variant="h4">What you can do</Typography>
        <Paragraph>
          Dolore nonummy at quo et dapibus viverra quis? Natus convallis netus
          metus, mollis elementum dictumst deserunt architecto accumsan placerat
          repellat? Dolor magnis pede natoque? Facilisis! Iste aenean tincidunt
          auctor minus! Vivamus adipisicing hac. Fames, hic, a accusantium,
          deleniti tempor.
        </Paragraph>
        <Typography variant="h4">How it works</Typography>
        <Paragraph>
          Nam rhoncus quasi placerat adipisci eleifend laoreet, integer cubilia
          dictum gravida mollit illum tortor? Nulla officiis pede etiam?
          Lobortis accusamus, aliqua nibh nascetur magna volutpat! Libero orci
          vehicula? Luctus architecto suspendisse rem reiciendis sit natus
          fugit, ac etiam iste doloribus.
        </Paragraph>
      </div>
    </div>
  );
}

export default Welcome;
