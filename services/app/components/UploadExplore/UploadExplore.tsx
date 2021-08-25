import { Grid } from '@material-ui/core';
import { useState } from 'react';
import BudgetView from '../BudgetView/BudgetView';
import Divider from '../Divider';
import Paragraph from '../Paragraph';
import PreliminaryResults from '../PreliminaryResults/PreliminaryResults';
import SectionTitle from '../SectionTitle';
import UIButton from '../UIButton';
import UploadSection from './UploadSection';

interface UploadExploreProps {
  onNextClick: () => void;
  refinementQueue: number[];
  onCommandToggle: (commandId: number) => void;
}
function UploadExplore({
  onNextClick,
  onCommandToggle,
  refinementQueue,
}: UploadExploreProps): JSX.Element {
  return (
    <div>
      <SectionTitle>
        Access confidential tax data to advance your research
      </SectionTitle>
      <Paragraph>
        Welcome to this tool for accessing{' '}
        <a href="#">summary confidential tax data</a> in a{' '}
        <a href="#">privacy-protected way</a>. You will first view preliminary
        results on this <strong>Upload &amp; Explore</strong> tab. You will then
        enter an <a href="#">IRS-certified secure environment</a> to review,
        refine, and request confidential data on the next two tabs.
      </Paragraph>
      <Paragraph>
        The <strong>Upload &amp; Explore</strong> tab will show your analyses
        using the <a href="#">synthetic tax data</a>. You can then see the cost
        against your <a href="#">two privacy budgets</a> for accessing the same
        analyses with the confidential data. Add the analyses you want to run on
        the confidential data into the review &amp; refinement queue. The system
        will process these requests in the background and you will access them
        on the <strong>Review &amp; Refinement</strong> tab when you are within
        the secure environment. Placing an analysis in the review &amp;
        refinement queue only incurs a cost to your review &amp; refinement
        budget.
      </Paragraph>
      <Paragraph>
        <a href="#">See Full Instructions</a>
      </Paragraph>
      <Divider />
      <BudgetView />
      <Divider />
      <UploadSection />
      <Divider />
      <PreliminaryResults
        refinementQueue={refinementQueue}
        onCommandToggle={onCommandToggle}
      />
      <Divider />
      <div>
        <Grid container={true} alignItems="center">
          <Grid item={true} xs={8}>
            <SectionTitle>Next Step:</SectionTitle>
            <Paragraph>
              Enter the secure environment and select the{' '}
              <strong>Review &amp; Refinement</strong> tab to see your analyses
              using the confidential data. Here, you will be able to refine the
              level of privacy adjustment and select analyses to add to your
              public-release request.
            </Paragraph>
          </Grid>
          <Grid item={true} container={true} xs={4} justify="flex-end">
            <UIButton
              disabled={refinementQueue.length === 0}
              title="Next"
              icon="ChevronRight"
              onClick={onNextClick}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UploadExplore;
