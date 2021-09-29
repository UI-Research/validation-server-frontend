import { useContext } from 'react';
import { useQuery } from 'react-query';
import notEmpty from '../../util/notEmpty';
import ApiContext from '../context/ApiContext';
import { loadList } from '../context/ApiContext/load';
import { useBudgetQuery } from '../context/ApiContext/queries/budget';
import { ConfidentialDataResult } from '../context/ApiContext/queries/confidentialData';
import NextStepSection from '../NextStepSection';
import Paragraph from '../Paragraph';

function useConfidentialDataResultsByCommandIds(commandIds: number[]) {
  const { token } = useContext(ApiContext);
  if (!token) {
    throw new Error('Token is not defined.');
  }
  const results = useQuery(
    ['confidential-data-result', { commandIds }],
    async () => {
      const all = await Promise.all(
        commandIds.map(commandId =>
          loadList<ConfidentialDataResult>(
            `/confidential-data-result/?command_id=${commandId}`,
            token,
          ),
        ),
      );
      return all;
    },
  );
  return results;
}

interface UploadExploreNextSectionProps {
  onNextClick: () => void;
  refinementQueue: number[];
}
function UploadExploreNextSection({
  onNextClick,
  refinementQueue,
}: UploadExploreNextSectionProps): JSX.Element {
  const refinementResults =
    useConfidentialDataResultsByCommandIds(refinementQueue);
  const refinementBudget = useBudgetQuery('review-and-refinement-budget');

  const availableBudget = refinementBudget.data?.total_budget_available;
  const isUnrefinedData = refinementResults.data?.some(
    a =>
      a.length === 0 ||
      !a.some(
        b =>
          b.privacy_budget_used === '1.00' &&
          b.display_results_decision === true,
      ),
  );
  const willGoOverBudget =
    notEmpty(availableBudget) &&
    notEmpty(isUnrefinedData) &&
    isUnrefinedData &&
    availableBudget < 1;
  // Disable the "next" button if the refinement queue is empty,
  // or if the request will ultimately go over budget (waiting for data to load before checking).
  const disableNextButton =
    refinementQueue.length === 0 ||
    refinementResults.isLoading ||
    refinementBudget.isLoading ||
    willGoOverBudget;
  return (
    <NextStepSection
      buttonDisabled={disableNextButton}
      description={
        <Paragraph>
          Enter the secure environment and select the{' '}
          <strong>Review &amp; Refinement</strong> tab to see your analyses
          using the confidential data. Here, you will be able to refine the
          level of privacy adjustment and select analyses to add to your
          public-release request.
        </Paragraph>
      }
      onNextClick={onNextClick}
      warningMessage={
        (willGoOverBudget &&
          'No available budget in Review & Refinement to make this request.') ||
        undefined
      }
    />
  );
}

export default UploadExploreNextSection;
