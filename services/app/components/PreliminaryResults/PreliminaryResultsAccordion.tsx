import { Grid } from '@material-ui/core';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';
import Accordion from '../Accordion';
import AccordionContentTitle from '../Accordion/content/AccordionContentTitle';
import CommandDisplay from '../Accordion/content/CommandDisplay';
import SyntheticDataDisplay from '../Accordion/content/SyntheticDataDisplay';
import CommandRenameDialog from '../CommandRenameDialog';
import {
  CommandResponseResult,
  useCommandDelete,
} from '../context/ApiContext/queries/command';
import { useSyntheticDataResultByCommandIdQuery } from '../context/ApiContext/queries/syntheticDataResult';
import LoadingIndicator from '../LoadingIndicator';
import MoreMenuButton from '../MoreMenu/MoreMenuButton';
import Paragraph from '../Paragraph';
import PrivacyCostFigure from '../PrivacyCostFigure';
import UIButton from '../UIButton';
import PreliminarySummaryContent from './PreliminarySummaryContent';

function CommandNotAllowedMessage(): JSX.Element {
  return (
    <Fragment>
      Command not allowed in this system. Please see list of{' '}
      <Link href="/help">available commands</Link>.
    </Fragment>
  );
}

interface PreliminaryResultsAccordionProps {
  added?: boolean;
  onAddClick?: () => void;
  onRemoveCommand: () => void;
  command: CommandResponseResult;
  availableRefinement: number;
  startingRefinement: number;
  availablePublic: number;
}
function PreliminaryResultsAccordion({
  added,
  onAddClick,
  onRemoveCommand,
  command,
  availablePublic,
  availableRefinement,
  startingRefinement,
}: PreliminaryResultsAccordionProps): JSX.Element | null {
  const summaryRef = useRef<HTMLDivElement | null>(null);
  // TODO: Handle any possible errors from the DELETE query.
  const commandDeleteResult = useCommandDelete();
  const [showDialog, setShowDialog] = useState(false);
  const {
    data: resultItem,
    isError,
    isLoading,
  } = useSyntheticDataResultByCommandIdQuery(command.command_id);

  const handleRenameClick = () => {
    setShowDialog(true);
  };
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleRemoveClick = () => {
    onRemoveCommand();
    commandDeleteResult.mutate({ command_id: command.command_id });
  };

  const handleAddClick = () => {
    // Close the accordion and focus the summary.
    if (summaryRef.current) {
      summaryRef.current.click();
      summaryRef.current.focus();
    }
    if (onAddClick) {
      onAddClick();
    }
  };

  // TODO: Do something user facing if synthetic data result query errors out.
  if (isError) {
    return null;
  }

  // Wait for data result item to finish loading.
  if (isLoading || !resultItem) {
    return <LoadingIndicator />;
  }

  const resultData: Array<{ [key: string]: string | number }> | false =
    resultItem.result.ok && JSON.parse(resultItem.result.data);
  const cost = Number(resultItem.privacy_budget_used);
  const title = command.command_name;
  const icon = resultItem.result.ok ? 'check' : 'warning';

  return (
    <Accordion
      id={String(resultItem.run_id)}
      summaryContent={
        <PreliminarySummaryContent
          added={added}
          iconType={icon}
          text={title}
          onAddedClick={onAddClick}
          onRenameClick={handleRenameClick}
          onRemoveClick={handleRemoveClick}
        />
      }
      summaryRef={summaryRef}
    >
      <div style={{ width: '100%' }}>
        <CommandDisplay command={command} />
        {resultData ? (
          <div>
            <SyntheticDataDisplay syntheticDataResult={resultItem} />
            <AccordionContentTitle>
              Adjustments for Privacy in the Confidential Data
            </AccordionContentTitle>
            <Paragraph>
              To preserve privacy, random variation will be added to the
              confidential data you see in the next tabs. The amount of
              variation added will be summarized, showing the root mean square
              error (RMSE) between the confidential data and the posted data.
            </Paragraph>
            {!isNaN(cost) && (
              <Fragment>
                <PrivacyCostFigure
                  availableBudget={availableRefinement}
                  cost={cost}
                  title="Privacy Cost for Review &amp; Refinement of Analyses"
                  totalBudget={startingRefinement}
                />
                <Grid
                  container={true}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item={true}>
                    <UIButton
                      title={`${
                        added ? 'Remove from' : 'Add to'
                      } Review & Refinement Queue`}
                      icon="PlaylistAdd"
                      onClick={handleAddClick}
                    />
                  </Grid>
                  <Grid item={true}>
                    <MoreMenuButton
                      onRenameClick={handleRenameClick}
                      onRemoveClick={handleRemoveClick}
                    />
                  </Grid>
                </Grid>
                <AccordionContentTitle>
                  Privacy Cost for Public Release of Results
                </AccordionContentTitle>
                <Paragraph>
                  Cost for request: {cost.toLocaleString()} /{' '}
                  {availablePublic.toLocaleString()}
                </Paragraph>
              </Fragment>
            )}
          </div>
        ) : (
          <div>
            {/* TODO: Properly parse error/issue and display. */}
            <strong>Issue:</strong>{' '}
            {resultItem.result.error &&
            resultItem.result.error !==
              // Use our custom "not allowed" message since it includes a link.
              'Command not allowed in this system. Plese see list of available commands.' ? (
              resultItem.result.error
            ) : (
              <CommandNotAllowedMessage />
            )}
          </div>
        )}
      </div>
      <CommandRenameDialog
        command={command}
        onDialogClose={handleDialogClose}
        showDialog={showDialog}
      />
    </Accordion>
  );
}

export default PreliminaryResultsAccordion;
