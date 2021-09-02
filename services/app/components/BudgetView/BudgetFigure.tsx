import { Grid, Typography } from '@material-ui/core';
import BarChart from '../BarChart';

interface BudgetFigureProps {
  available: number;
  starting: number;
}
function BudgetFigure({ available, starting }: BudgetFigureProps): JSX.Element {
  return (
    <div>
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
      <BarChart max={starting} value={available} />
      <Typography align="center">Privacy Units</Typography>
    </div>
  );
}

export default BudgetFigure;
