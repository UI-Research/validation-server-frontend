import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';
import { Step } from '../Steps/steps';
import StepItem from './StepItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5, 9),
  },
  signOutButton: {
    marginTop: theme.spacing(3),
  },
}));

export interface StepData extends Step {
  locked?: boolean;
}

interface StepsNavProps {
  activeStep: string;
  steps: StepData[];
  onStepClick: (id: string) => void;
}

function StepsNav({
  activeStep,
  steps,
  onStepClick,
}: StepsNavProps): JSX.Element {
  const classes = useStyles();
  const { setToken } = useContext(ApiContext);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    step: StepData,
  ) => {
    e.preventDefault();
    if (!step.locked) {
      onStepClick(step.id);
    }
  };

  const handleSignOutClick = () => {
    setToken(null);
  };

  return (
    <div className={classes.root}>
      <Grid container={true} spacing={5}>
        {steps.map(step => (
          <StepItem
            key={step.id}
            id={step.id}
            title={step.title}
            description={step.description}
            onClick={e => handleClick(e, step)}
            isActive={activeStep === step.id}
            isLocked={step.locked}
          />
        ))}
      </Grid>
      <div className={classes.signOutButton}>
        <Button size="small" onClick={handleSignOutClick}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default StepsNav;
