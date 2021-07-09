import { Grid, Typography } from '@material-ui/core';
import BarChart from '../BarChart';

const chartWidth = 370;

interface BudgetFigureProps {
  available: number;
  starting: number;
}
function BudgetFigure({ available, starting }: BudgetFigureProps): JSX.Element {
  return (
    <div style={{ width: chartWidth }}>
      <Grid container={true}>
        <Grid item={true} xs={true}>
          <Typography align="left">
            <strong>Available:</strong> {available.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item={true} xs={true}>
          <Typography align="right">
            <strong>Starting:</strong> {starting.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
      <BarChart width={chartWidth} max={starting} value={available} />
      <Typography align="center">Privacy Units</Typography>
    </div>
  );
}

export default BudgetFigure;
