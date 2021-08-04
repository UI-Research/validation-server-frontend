import { Grid, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import Accordion from '../Accordion';
import BarChart from '../BarChart';
import CodeBlock from '../CodeBlock';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import PreliminarySummaryContent from './PreliminarySummaryContent';

const available = 610;
const starting = 1000;
const cost = 3;
const chartWidth = 600;

const SampleDetail = () => (
  <div>
    <div>
      <strong>Command:</strong>
    </div>
    <div>[PLACEHOLDER]</div>
    <div>
      <strong>Results with Synthetic Data:</strong>
    </div>
    <div>[PLACEHOLDER]</div>
    <div>
      <strong>Adjustments for Privacy in the Confidential Data</strong>
    </div>
    <Paragraph>
      To preserve privacy, random variation will be added to the confidential
      data you see in the next tabs. The amount of variation added will be
      summarized, showing the root mean square error (RMSE) between the
      confidential data and the posted data.
    </Paragraph>
    <div>
      <strong>Privacy Cost for Review &amp; Refinement of Analyses</strong>
    </div>
    <div style={{ width: chartWidth }}>
      <Grid container={true}>
        <Grid item={true} xs={true}>
          <Typography align="left">
            Cost for request: {cost.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item={true} xs={true}>
          <Typography align="right">
            Available budget: {available.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
      <BarChart
        width={chartWidth}
        max={starting}
        value={available}
        secondaryValue={cost}
      />
    </div>
  </div>
);

interface ResultItem {
  id: string;
  title: string;
  icon: 'check' | 'warning';
  details: ReactNode;
}
const results: ResultItem[] = [
  {
    id: '1',
    title: 'plot_private 1',
    icon: 'check',
    details: <SampleDetail />,
  },
  {
    id: '2',
    title: 'Error PCA 1',
    icon: 'warning',
    details: (
      <div>
        <div>
          <strong>Command:</strong>
        </div>
        <div>
          <CodeBlock code={'PCA(synthdata, row.w = "s006")'} />
        </div>
        <div>
          <strong>Issue:</strong> Command not allowed in this system. Please see
          list of <a href="#">available commands</a>.
        </div>
      </div>
    ),
  },
  {
    id: '3',
    title: 'tabulation_private 2',
    icon: 'check',
    details: <SampleDetail />,
  },
];

interface PreliminaryResultsProps {
  // TODO
}
function PreliminaryResults({}: PreliminaryResultsProps): JSX.Element {
  return (
    <div>
      <SectionTitle>Preliminary Results Using Synthetic Data</SectionTitle>
      <Paragraph>
        Here, you may review the results of each command using the{' '}
        <a href="#">synthetic tax data</a>. For each successful command, you
        will see the cost against your review &amp; refinement privacy budget to
        view these results with the confidential tax data. For your reference,
        the public use privacy cost is also displayed.
      </Paragraph>
      <div>
        {results.map(result => (
          <Accordion
            key={result.id}
            id={result.id}
            summaryContent={
              <PreliminarySummaryContent
                iconType={result.icon}
                text={result.title}
              />
            }
          >
            {result.details}
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default PreliminaryResults;
