import { Grid, Typography } from '@material-ui/core';
import { Fragment, useState } from 'react';
import Accordion from '../Accordion';
import BarChart from '../BarChart';
import CodeBlock from '../CodeBlock';
import CommandRenameDialog from '../CommandRenameDialog';
import { useCommandDelete } from '../context/ApiContext/queries/command';
import { SyntheticRunData } from '../context/ApiContext/queries/syntheticData';
import { useSyntheticDataResultQuery } from '../context/ApiContext/queries/syntheticDataResult';
import LoadingIndicator from '../LoadingIndicator';
import MoreMenu from '../MoreMenu';
import Paragraph from '../Paragraph';
import SpreadsheetTable from '../SpreadsheetTable';
import UIButton from '../UIButton';
import PreliminarySummaryContent from './PreliminarySummaryContent';

const chartWidth = 600;

function CommandNotAllowedMessage(): JSX.Element {
  return (
    <Fragment>
      Command not allowed in this system. Please see list of{' '}
      <a href="#">available commands</a>.
    </Fragment>
  );
}

interface PreliminaryResultsAccordionProps {
  runItem: SyntheticRunData;
  availableRefinement: number;
  startingRefinement: number;
  availablePublic: number;
}
function PreliminaryResultsAccordion({
  runItem,
  availablePublic,
  availableRefinement,
  startingRefinement,
}: PreliminaryResultsAccordionProps): JSX.Element | null {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );
  // TODO: Handle any possible errors from the DELETE query.
  const commandDeleteResult = useCommandDelete();
  const [showDialog, setShowDialog] = useState(false);
  const { data: resultItem, isLoading } = useSyntheticDataResultQuery(
    runItem.run_id,
  );
  const { command } = runItem;

  const handleMoreButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleRenameClick = () => {
    setShowDialog(true);
  };
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleRemoveClick = () => {
    commandDeleteResult.mutate({ command_id: command.command_id });
  };

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
          iconType={icon}
          text={title}
          onRenameClick={handleRenameClick}
          onRemoveClick={handleRemoveClick}
        />
      }
    >
      <div>
        <Paragraph>
          <strong>Command:</strong>
        </Paragraph>
        <div>
          <CodeBlock code={command.sanitized_command_input.analysis_query} />
        </div>
        {resultData ? (
          <div>
            <Paragraph>
              <strong>Results with Synthetic Data:</strong>
            </Paragraph>
            <div>
              <SpreadsheetTable
                columns={Object.keys(resultData[0])}
                data={resultData}
              />
            </div>
            <Paragraph>
              <strong>Adjustments for Privacy in the Confidential Data</strong>
            </Paragraph>
            <Paragraph>
              To preserve privacy, random variation will be added to the
              confidential data you see in the next tabs. The amount of
              variation added will be summarized, showing the root mean square
              error (RMSE) between the confidential data and the posted data.
            </Paragraph>
            {!isNaN(cost) && (
              <Fragment>
                <Paragraph>
                  <strong>
                    Privacy Cost for Review &amp; Refinement of Analyses
                  </strong>
                </Paragraph>
                <div style={{ width: chartWidth }}>
                  <Grid container={true}>
                    <Grid item={true} xs={true}>
                      <Typography align="left">
                        Cost for request: {cost.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={true}>
                      <Typography align="right">
                        Available budget: {availableRefinement.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <BarChart
                    width={chartWidth}
                    max={startingRefinement}
                    value={availableRefinement}
                    secondaryValue={cost}
                  />
                  <Grid
                    container={true}
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item={true}>
                      <UIButton
                        title="Add to Review &amp; Refinement Queue"
                        icon="PlaylistAdd"
                      />
                    </Grid>
                    <Grid item={true}>
                      <UIButton
                        title="More Actions"
                        icon="MoreVert"
                        aria-label="More"
                        aria-controls="more-menu"
                        aria-haspopup="true"
                        onClick={handleMoreButtonClick}
                      />
                      <MoreMenu
                        menuAnchorEl={menuAnchorEl}
                        onMenuClose={handleMenuClose}
                        onRenameClick={handleRenameClick}
                        onRemoveClick={handleRemoveClick}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Paragraph>
                  <strong>Privacy Cost for Public Release of Results</strong>
                </Paragraph>
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
