import Link from 'next/link';
import BudgetView from '../BudgetView/BudgetView';
import Divider from '../Divider';
import Paragraph from '../Paragraph';
import PreliminaryResults from '../PreliminaryResults/PreliminaryResults';
import SectionTitle from '../SectionTitle';
import UploadExploreNextSection from './UploadExploreNextSection';
import UploadSection from './UploadSection';

interface UploadExploreProps {
  onNextClick: () => void;
  refinementQueue: number[];
  onCommandToggle: (commandId: number) => void;
  onCommandRemove: (commandId: number) => void;
}
function UploadExplore({
  onNextClick,
  onCommandToggle,
  onCommandRemove,
  refinementQueue,
}: UploadExploreProps): JSX.Element {
  return (
    <div>
      <SectionTitle>
        Access confidential tax data to advance your research
      </SectionTitle>
      <Paragraph>
        Welcome to this tool for accessing{' '}
        <Link href="/data">summary confidential tax data</Link> in a{' '}
        <Link href="/data">privacy-protected way</Link>. You will first view
        preliminary results on this <strong>Upload &amp; Explore</strong> tab.
        You will then enter an{' '}
        <Link href="/data">IRS-certified secure environment</Link> to review,
        refine, and request confidential data on the next two tabs.
      </Paragraph>
      <Paragraph>
        The <strong>Upload &amp; Explore</strong> tab will show your analyses
        using the <Link href="/data">synthetic tax data</Link>. You can then see
        the cost against your <Link href="/data">two privacy budgets</Link> for
        accessing the same analyses with the confidential data. Add the analyses
        you want to run on the confidential data into the review &amp;
        refinement queue. The system will process these requests in the
        background and you will access them on the{' '}
        <strong>Review &amp; Refinement</strong> tab when you are within the
        secure environment. Placing an analysis in the review &amp; refinement
        queue only incurs a cost to your review &amp; refinement budget.
      </Paragraph>
      <Paragraph>
        <Link href="/help">See Full Instructions</Link>
      </Paragraph>
      <Divider />
      <BudgetView />
      <Divider />
      <UploadSection />
      <Divider />
      <PreliminaryResults
        refinementQueue={refinementQueue}
        onCommandToggle={onCommandToggle}
        onCommandRemove={onCommandRemove}
      />
      <Divider />
      <div>
        <UploadExploreNextSection
          onNextClick={onNextClick}
          refinementQueue={refinementQueue}
        />
      </div>
    </div>
  );
}

export default UploadExplore;
