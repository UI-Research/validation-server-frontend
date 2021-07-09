import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import StepItem from './StepItem';

interface Step {
  id: string;
  title?: string;
  description?: string;
}
const steps: Step[] = [
  {
    id: '1',
    title: 'Step 1',
    description: 'Upload & Explore',
  },
  {
    id: '2',
    title: 'Step 2',
    description: 'Review & Refine',
  },
  {
    id: '3',
    title: 'Step 3',
    description: 'Request & Release',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5, 9),
  },
}));

interface StepsNavProps {
  // TODO
}

function StepsNav({}: StepsNavProps): JSX.Element {
  const [activeStep, setActiveStep] = useState(steps[0].id);
  const classes = useStyles();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    setActiveStep(id);
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
