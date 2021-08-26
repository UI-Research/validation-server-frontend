import { Grid, IconButton, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { AddShoppingCart, MoreVert } from '@material-ui/icons';
import { Fragment, ReactNode, useRef, useState } from 'react';
import Accordion from '../Accordion';
import BarChart from '../BarChart';
import CodeBlock from '../CodeBlock';
import { useBudgetQuery } from '../context/ApiContext/queries/budget';
import {
  CommandResponseResult,
  useCommandQuery,
} from '../context/ApiContext/queries/command';
import { useSyntheticDataResultByCommandIdQuery } from '../context/ApiContext/queries/syntheticDataResult';
import LoadingIndicator from '../LoadingIndicator';
import MoreMenu from '../MoreMenu';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import SpreadsheetTable from '../SpreadsheetTable';
import UIButton from '../UIButton';

const chartWidth = 600;

function useRefinementQueueResults(queue: number[]) {
  const commandResult = useCommandQuery();
  const refinementBudgetResult = useBudgetQuery('review-and-refinement-budget');
  const publicBudgetResult = useBudgetQuery('public-use-budget');

  return {
    isLoading:
      commandResult.isLoading ||
      refinementBudgetResult.isLoading ||
      publicBudgetResult.isLoading,
    // Sort commands by ID.
    data: commandResult.data?.results
      .filter(c => queue.includes(c.command_id))
      .sort((a, b) => (a.command_id > b.command_id ? 1 : -1)),
    refinementBudgetData: refinementBudgetResult.data,
    publicBudgetData: publicBudgetResult.data,
  };
}

interface ReviewRefineQueueProps {
  queue: number[];
}
function ReviewRefineQueue({ queue }: ReviewRefineQueueProps): JSX.Element {
  const [finalQueue, setFinalQueue] = useState<number[]>([]);
  const { data, isLoading, publicBudgetData, refinementBudgetData } =
    useRefinementQueueResults(queue);

  const onItemToggle = (commandId: number): void => {
    if (finalQueue.includes(commandId)) {
      setFinalQueue(finalQueue.filter(n => n !== commandId));
    } else {
      setFinalQueue([...finalQueue, commandId]);
    }
  };

  return (
    <div>
      <SectionTitle>Review &amp; Refinement Queue</SectionTitle>
      <div>
        {/* Wait for everything to load. */}
        {isLoading || !data || !publicBudgetData || !refinementBudgetData ? (
          <LoadingIndicator />
        ) : (
          <Fragment>
            {data.map(c => (
              <ReviewRefineAccordion
                key={c.command_id}
                command={c}
                added={finalQueue.includes(c.command_id)}
                onAddClick={() => onItemToggle(c.command_id)}
                availablePublic={publicBudgetData.total_budget_available}
                availableRefinement={
                  refinementBudgetData.total_budget_available
                }
                startingRefinement={Number(
                  refinementBudgetData.total_budget_allocated,
                )}
              />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
}

interface ReviewRefineAccordionProps {
  added: boolean;
  command: CommandResponseResult;
  onAddClick: () => void;
  availableRefinement: number;
  startingRefinement: number;
  availablePublic: number;
}
function ReviewRefineAccordion({
  added,
  // availablePublic,
  availableRefinement,
  command,
  onAddClick,
  startingRefinement,
}: ReviewRefineAccordionProps): JSX.Element | null {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const {
    data: syntheticResult,
    isError,
    isLoading,
  } = useSyntheticDataResultByCommandIdQuery(command.command_id);

  const handleMoreButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
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

  const handleRenameClick = () => {
    // TODO
  };
  const handleRemoveClick = () => {
    // TODO
  };

  // TODO: Do something user facing if synthetic data result query errors out.
  if (isError) {
    return null;
  }

  // Wait for data result item to finish loading.
  if (isLoading || !syntheticResult) {
    return <LoadingIndicator />;
  }

  const syntheticData: Array<{ [key: string]: string | number }> | false =
    syntheticResult.result.ok && JSON.parse(syntheticResult.result.data);

  // TODO: Get actual cost from confidential result item.
  const cost = Number(syntheticResult.privacy_budget_used);
  return (
    <Accordion
      id={String(command.command_id)}
      summaryContent={
        <ReviewRefineAccordionSummary
          added={added}
          cost={cost}
          onAddedClick={onAddClick}
          text={command.command_name}
        />
      }
      summaryRef={summaryRef}
    >
      <div style={{ width: '100%' }}>
        <Paragraph>
          <strong>Command:</strong>
        </Paragraph>
        <div>
          <CodeBlock code={command.sanitized_command_input.analysis_query} />
        </div>
        {syntheticData ? (
          <Fragment>
            <Paragraph>
              <strong>Results with Synthetic Data:</strong>
            </Paragraph>
            <div>
              <SpreadsheetTable
                columns={Object.keys(syntheticData[0])}
                data={syntheticData}
              />
            </div>
            <Paragraph>
              <strong>Results with Confidential Data:</strong>
            </Paragraph>
            <div>
              <SpreadsheetTable
                columns={Object.keys(syntheticData[0])}
                data={syntheticData}
              />
            </div>
            {!isNaN(cost) && (
              <Fragment>
                <Paragraph>
                  <strong>Privacy Cost for Public Release Access</strong>
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
                </div>
              </Fragment>
            )}
            <Paragraph>
              <strong>Adjustments for Privacy</strong>
            </Paragraph>
            <Paragraph>
              {/* TODO: Properly setup this section with dynamic data. */}
              To preserve privacy, random variation was added by setting:
            </Paragraph>
            <Typography component="ul">
              <li>
                Root mean square error (RMSE): 1,293{' '}
                <a href="#">Refine this privacy adjustment</a>
              </li>
            </Typography>
            <Paragraph>
              Additional adjustments require additional review &amp; refinement
              budget cost.
            </Paragraph>
            <div>
              <Grid
                container={true}
                justify="space-between"
                alignItems="center"
              >
                <Grid item={true}>
                  <UIButton
                    title={`${
                      added ? 'Remove from' : 'Add to'
                    } final request queue`}
                    icon="AddShoppingCart"
                    onClick={handleAddClick}
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
          </Fragment>
        ) : null}
      </div>
    </Accordion>
  );
}

interface ReviewRefineAccordionSummaryProps {
  added?: boolean;
  cost: number;
  onAddedClick?: () => void;
  onRemoveClick?: () => void;
  onRenameClick?: () => void;
  text: string | ReactNode;
}
function ReviewRefineAccordionSummary({
  added,
  cost,
  onAddedClick,
  text,
}: ReviewRefineAccordionSummaryProps): JSX.Element {
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAddedClick && onAddedClick();
  };
  return (
    <div style={{ flexGrow: 1, width: '100%' }}>
      <Grid container={true} alignItems="center">
        <Grid item={true} xs={7} md={9}>
          {text}
        </Grid>
        <Grid item={true} xs={1} md={1}>
          {cost}
        </Grid>
        <Grid item={true} xs={4} md={2}>
          <Grid container={true} justify="flex-end">
            <Grid item={true}>
              <IconButton
                aria-label="Add"
                onClick={handleAddClick}
                style={added ? { backgroundColor: green[100] } : undefined}
              >
                <AddShoppingCart
                  style={added ? { fill: green[900] } : undefined}
                />
              </IconButton>
              <IconButton aria-label="More">
                <MoreVert />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReviewRefineQueue;
