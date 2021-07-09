import { Grid, Typography } from '@material-ui/core';
import { cyan, grey } from '@material-ui/core/colors';

const svgWidth = 370;
const svgHeight = 28;
const borderPx = 1;
const barMaxWidth = svgWidth - borderPx * 2;
const barHeight = svgHeight - borderPx * 2;

interface BudgetFigureProps {
  available: number;
  starting: number;
}
function BudgetFigure({ available, starting }: BudgetFigureProps): JSX.Element {
  if (starting < available) {
    throw new Error(
      '`starting` value should be higher than `available` value.',
    );
  }

  return (
    <div style={{ width: svgWidth }}>
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
      <svg width={svgWidth} height={svgHeight}>
        <rect
          fill="white"
          x={1}
          y={1}
          width={barMaxWidth}
          height={barHeight}
          strokeWidth={borderPx}
          stroke={grey[500]}
        />
        <rect
          x={1}
          y={1}
          fill={cyan[700]}
          width={(available / starting) * barMaxWidth}
          height={barHeight}
        />
      </svg>
      <Typography align="center">Privacy Units</Typography>
    </div>
  );
}

export default BudgetFigure;
