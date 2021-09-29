import { Grid, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { ReactNode } from 'react';
import SectionTitle from './SectionTitle';
import UIButton from './UIButton';

const useStyles = makeStyles(theme => ({
  alert: {
    margin: theme.spacing(2, 0),
  },
}));

interface NextStepSectionProps {
  buttonDisabled?: boolean;
  description: ReactNode;
  onNextClick: () => void;
  warningMessage?: string;
}
function NextStepSection({
  buttonDisabled,
  description,
  onNextClick,
  warningMessage,
}: NextStepSectionProps): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container={true} alignItems="center">
      <Grid item={true} xs={8}>
        <SectionTitle>Next Step:</SectionTitle>
        {description}
      </Grid>
      <Grid item={true} container={true} xs={4} justify="flex-end">
        <UIButton
          disabled={buttonDisabled}
          title="Next"
          icon="ChevronRight"
          onClick={onNextClick}
        />
        {warningMessage && (
          <Alert className={classes.alert} severity="error">
            {warningMessage}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

export default NextStepSection;
