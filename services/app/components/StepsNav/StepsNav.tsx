import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { steps } from '../Steps/steps';
import StepItem from './StepItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5, 9),
  },
}));

interface StepsNavProps {
  activeStep: string;
  onStepClick: (id: string) => void;
}

function StepsNav({ activeStep, onStepClick }: StepsNavProps): JSX.Element {
  const classes = useStyles();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    onStepClick(id);
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
            onClick={e => handleClick(e, step.id)}
            isActive={activeStep === step.id}
          />
        ))}
      </Grid>
    </div>
  );
}

export default StepsNav;
