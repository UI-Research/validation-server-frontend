import { Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import BarChart from '../BarChart';
import Divider from '../Divider';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import UIButton from '../UIButton';
import RequestReleaseAccordion from './RequestReleaseAccordion';

interface RequestReleaseProps {
  releaseQueue: string[];
}
function RequestRelease({ releaseQueue }: RequestReleaseProps): JSX.Element {
  // Initialize final queue items with the release queue.
  const [finalQueue, setFinalQueue] = useState<string[]>(releaseQueue);

  const totalCost = 15;
  const availableBudget = 87;
  const totalBudget = 100;

  const toggleItem = (id: string) => {
    setFinalQueue(arr => {
      if (arr.includes(id)) {
        return arr.filter(a => a !== id);
      } else {
        return [...arr, id];
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
        <div>
          {releaseQueue.map(r => (
            <RequestReleaseAccordion
              key={r}
              finalQueue={finalQueue}
              onCheckboxClick={() => toggleItem(r)}
              releaseId={r}
            />
          ))}
        </div>
      </div>
      <Divider />
      <div>
        <SectionTitle>Available Privacy Budget</SectionTitle>
        <Grid container={true}>
          <Grid item={true} xs={true}>
            <Typography align="left">
              <strong>Cost of selected:</strong> {totalCost.toLocaleString()}
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
          max={totalBudget}
          value={availableBudget}
          secondaryValue={totalCost}
        />
        <Typography align="center">Privacy Units</Typography>
        <UIButton
          style={{ margin: '2rem 0' }}
          title="Request selected analyses and spend privacy budget"
        />
        <Typography>
          The system will email you the files for each of your anlyses within 1
          day.
        </Typography>
      </div>
    </div>
  );
}

export default RequestRelease;
