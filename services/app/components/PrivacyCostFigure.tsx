import { Grid, Typography } from '@material-ui/core';
import BarChart from './BarChart';
import Paragraph from './Paragraph';

interface PrivacyCostFigureProps {
  availableBudget: number;
  cost: number;
  title: string;
  totalBudget: number;
}
function PrivacyCostFigure({
  availableBudget,
  cost,
  title,
  totalBudget,
}: PrivacyCostFigureProps): JSX.Element {
  return (
    <div>
      <Paragraph>
        <strong>{title}</strong>
      </Paragraph>
      <Grid container={true}>
        <Grid item={true} xs={true}>
          <Typography align="left">
            Cost for request: {cost.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item={true} xs={true}>
          <Typography align="right">
            Available budget: {availableBudget.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
      <BarChart
        width={600}
        max={totalBudget}
        value={availableBudget}
        secondaryValue={cost}
      />
    </div>
  );
}

export default PrivacyCostFigure;
