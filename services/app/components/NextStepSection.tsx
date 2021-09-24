import { Grid } from '@material-ui/core';
import { ReactNode } from 'react';
import SectionTitle from './SectionTitle';
import UIButton from './UIButton';

interface NextStepSectionProps {
  buttonDisabled?: boolean;
  description: ReactNode;
  onNextClick: () => void;
}
function NextStepSection({
  buttonDisabled,
  description,
  onNextClick,
}: NextStepSectionProps): JSX.Element {
  return (
    <Grid container={true} alignItems="center">
      <Grid item={true} xs={8}>
        <SectionTitle>Next Step:</SectionTitle>
        {description}
      </Grid>
      <Grid item={true} container={true} xs={4} justifyContent="flex-end">
        <UIButton
          disabled={buttonDisabled}
          title="Next"
          icon="ChevronRight"
          onClick={onNextClick}
        />
      </Grid>
    </Grid>
  );
}

export default NextStepSection;
