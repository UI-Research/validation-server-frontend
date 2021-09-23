import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Fragment, useState } from 'react';
import CsvDownload from 'react-csv-downloader';
import sanitize from 'sanitize-filename';
import notEmpty from '../../util/notEmpty';
import BarChart from '../BarChart';
import { useBudgetQuery } from '../context/ApiContext/queries/budget';
import {
  CommandResponseResult,
  useCommandByIdQuery,
} from '../context/ApiContext/queries/command';
import {
  ConfidentialDataResult,
  useConfidentialDataResultByIdQuery,
  useConfidentialDataResultPatch,
} from '../context/ApiContext/queries/confidentialData';
import {
  SyntheticDataResult,
  useSyntheticDataResultByCommandIdQuery,
} from '../context/ApiContext/queries/syntheticDataResult';
import Divider from '../Divider';
import LoadingIndicator from '../LoadingIndicator';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import UIButton from '../UIButton';
import RequestReleaseAccordion from './RequestReleaseAccordion';

const useStyles = makeStyles(theme => ({
  alert: {
    margin: theme.spacing(2, 0),
  },
  requestButton: {
    margin: theme.spacing(2, 0),
  },
}));

export interface ReleaseItem {
  id: string;
  command: CommandResponseResult;
  confidentialDataResult: ConfidentialDataResult;
  syntheticDataResult: SyntheticDataResult;
}

function useReleaseItem(id: string): ReleaseItem | null {
  const [commandId, confidentialDataRunId] = id.split('-').map(Number);
  const commandResult = useCommandByIdQuery(commandId);
  const confidentialResult = useConfidentialDataResultByIdQuery(
    confidentialDataRunId,
  );
  const syntheticResult = useSyntheticDataResultByCommandIdQuery(commandId);

  if (
    !commandResult.data ||
    !confidentialResult.data ||
    !syntheticResult.data
  ) {
    return null;
  }

  return {
    id,
    command: commandResult.data,
    confidentialDataResult: confidentialResult.data,
    syntheticDataResult: syntheticResult.data,
  };
}

function useRequestReleaseData(queue: string[]) {
  const arr = queue.map(useReleaseItem);
  // Filter to non-null items.
  const filtered = arr.filter(notEmpty);

  return {
    // If the original array length does not match that of the filtered array,
    // we can assume that data items are still loading.
    isLoading: arr.length !== filtered.length,
    data: filtered,
  };
}

interface RequestReleaseProps {
  releaseQueue: string[];
}
function RequestRelease({ releaseQueue }: RequestReleaseProps): JSX.Element {
  // Initialize final queue items with the release queue.
  const [finalQueue, setFinalQueue] = useState<string[]>(releaseQueue);
  const { isLoading, data } = useRequestReleaseData(releaseQueue);
  const publicBudgetResult = useBudgetQuery('public-use-budget');
  const confidentialPatch = useConfidentialDataResultPatch();
  const classes = useStyles();

  const finalItems = data.filter(d => finalQueue.includes(d.id));
  // For the CSV list, only show items that have the
  // `release_results_decision` property set to true.
  // This means that they were already requested and do not need to go through
  // the data result mutation process to use budget.
  const csvItems = finalItems.filter(
    i => i.confidentialDataResult.release_results_decision === true,
  );

  // Calculate our total cost by first generating an array of the cost of each item,
  const totalCost = finalItems
    .map(d => Number(d.confidentialDataResult.privacy_budget_used))
    // then using reduce to sum them together.
    .reduce((a, b) => a + b, 0);
  const availableBudget = publicBudgetResult.data?.total_budget_available;
  const totalBudget = publicBudgetResult.data?.total_budget_allocated;
  const costIsOverBudget =
    (availableBudget && totalCost > availableBudget) || false;

  const toggleItem = (id: string) => {
    setFinalQueue(arr => {
      if (arr.includes(id)) {
        return arr.filter(a => a !== id);
      } else {
        return [...arr, id];
      }
    });
  };

  const handleRequestClick = () => {
    finalItems.forEach(item => {
      // Set the "release results decision" property each item in the final queue
      // to `true` if necessary.
      if (item.confidentialDataResult.release_results_decision === false) {
        confidentialPatch.mutate({
          run_id: item.confidentialDataResult.run_id,
          release_results_decision: true,
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle>Preliminary Results Using Synthetic Data</SectionTitle>
      <Paragraph>
        The analyses you requested for public release are listed below along
        with their privacy costs. To remove items from your request, simply
        uncheck them. Remember to review your choices in light of your public
        release budget and their cost against that budget. When you have your
        final set selected, submit your request by clicking the{' '}
        <strong>Request selected analyses and spend privacy budget</strong>{' '}
        button. The files for each analysis will be emailed to you within one
        day.
      </Paragraph>
      <Divider />
      <div>
        <SectionTitle>Final Request Queue</SectionTitle>
        {isLoading || !data || !availableBudget || !totalBudget ? (
          <LoadingIndicator />
        ) : (
          <div>
            {data.map(r => (
              <RequestReleaseAccordion
                key={r.id}
                availablePublic={availableBudget}
                finalQueue={finalQueue}
                onCheckboxClick={() => toggleItem(r.id)}
                releaseItem={r}
                startingPublic={Number(totalBudget)}
              />
            ))}
          </div>
        )}
      </div>
      <Divider />
      <div>
        <SectionTitle>Available Privacy Budget</SectionTitle>
        {totalBudget && availableBudget ? (
          <Fragment>
            <Grid container={true}>
              <Grid item={true} xs={true}>
                <Typography align="left">
                  <strong>Cost of selected:</strong>{' '}
                  {totalCost.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item={true} xs={true}>
                <Typography align="right">
                  <strong>Available budget:</strong>{' '}
                  {availableBudget.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
            <BarChart
              width={600}
              max={Number(totalBudget)}
              value={availableBudget}
              secondaryValue={totalCost}
            />
            <Typography align="center">Privacy Units</Typography>
          </Fragment>
        ) : (
          <LoadingIndicator />
        )}
        {costIsOverBudget && (
          <Alert className={classes.alert} severity="error">
            Total cost ({totalCost}) exceeds the available amount in your
            privacy budget ({availableBudget}).
          </Alert>
        )}
        <UIButton
          className={classes.requestButton}
          disabled={finalItems.length === 0 || costIsOverBudget}
          onClick={handleRequestClick}
          title="Request selected analyses and spend privacy budget"
        />
        {csvItems.length > 0 &&
          (confidentialPatch.isLoading ? (
            <LoadingIndicator />
          ) : (
            <div>
              <ul>
                {csvItems.map(i => (
                  <li key={i.id}>
                    <ReleaseCsv item={i} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

interface ReleaseCsvProps {
  item: ReleaseItem;
}
function ReleaseCsv({ item }: ReleaseCsvProps): JSX.Element {
  // Create sanitized filename for the CSV.
  const name = sanitize(
    `${item.command.command_name}_${item.confidentialDataResult.privacy_budget_used}.csv`,
  );
  const data: Array<{ [key: string]: string }> = JSON.parse(
    item.confidentialDataResult.result.data,
  );

  return (
    <CsvDownload datas={data} filename={name} style={{ display: 'inline' }}>
      <Button endIcon={<GetApp />} style={{ textTransform: 'none' }}>
        Download CSV for &quot;{item.command.command_name} (
        {item.confidentialDataResult.privacy_budget_used})&quot;
      </Button>
    </CsvDownload>
  );
}

export default RequestRelease;
