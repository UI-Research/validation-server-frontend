import BudgetView from '../BudgetView/BudgetView';
import Divider from '../Divider';
import NextStepSection from '../NextStepSection';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import ReviewRefineQueue from './ReviewRefineQueue';

interface ReviewRefineProps {
  onNextClick: () => void;
  refinementQueue: number[];
  releaseQueue: number[];
  onReleaseToggle: (commandId: number) => void;
}
function ReviewRefine({
  onNextClick,
  refinementQueue,
  releaseQueue,
  onReleaseToggle,
}: ReviewRefineProps): JSX.Element {
  return (
    <div>
      <SectionTitle>Preliminary Results Using Synthetic Data</SectionTitle>
      <Paragraph>
        Now that you are within the secure environment, you can see the analyses
        you selected for review and refinement with the confidential data. The
        earlier results using synthetic data are also available for comparison
      </Paragraph>
      <Paragraph>
        For each analysis, you can see the random variation that the system
        added to the confidential data to protect privacy. You can re-run any
        request with different privacy adjustments. This will incur additional
        review &amp; refinement budget cost. Remember that reducing the amount
        of random variation added to data comes at a greater cost to each of
        your privacy budgets, in turn.
      </Paragraph>
      <Paragraph>
        Once you have identified analyses you want to request for public
        release, selected the shopping cart icon or the{' '}
        <strong>Add to final request queue</strong> button. Identified analysis
        will appear in your final request queue on the{' '}
        <strong>Request &amp; Release</strong> tab.
      </Paragraph>
      <Divider />
      <BudgetView />
      <Divider />
      <ReviewRefineQueue
        refinementQueue={refinementQueue}
        releaseQueue={releaseQueue}
        onReleaseToggle={onReleaseToggle}
      />
      <Divider />
      <NextStepSection
        buttonDisabled={releaseQueue.length === 0}
        description={
          <Paragraph>
            Select the <strong>Request &amp; Release</strong> tab to see all the
            analyses you have requested for public release. There, you can
            submit a final request; files leveraging the confidential data for
            each analysis will be emailed to you.
          </Paragraph>
        }
        onNextClick={onNextClick}
      />
    </div>
  );
}

export default ReviewRefine;
