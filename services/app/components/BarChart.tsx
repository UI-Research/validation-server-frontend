import { cyan, grey } from '@material-ui/core/colors';

const widthDefault = 370;
const heightDefault = 28;
const borderPx = 1;

interface BarChartProps {
  max: number;
  value: number;
  secondaryValue?: number;
  height?: number;
  width?: number;
}

function BarChart({
  max,
  value,
  secondaryValue,
  height = heightDefault,
  width = widthDefault,
}: BarChartProps): JSX.Element {
  if (max < value) {
    throw new Error('value given is higher than max.');
  }
  if (secondaryValue && max < secondaryValue) {
    throw new Error('secondaryValue given is higher than max.');
  }
  const barMaxWidth = width - borderPx * 2;
  const barHeight = height - borderPx * 2;
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <rect
        fill="white"
        x={1}
        y={1}
        width={barMaxWidth}
        height={barHeight}
        strokeWidth={borderPx}
        stroke={grey[500]}
      />
      {/* Only display positive values. */}
      {value >= 0 && (
        <rect
          x={1}
          y={1}
          fill={cyan[700]}
          width={(value / max) * barMaxWidth}
          height={barHeight}
        />
      )}
      {secondaryValue && secondaryValue >= 0 ? (
        <rect
          x={1}
          y={1}
          fill={cyan[900]}
          width={(secondaryValue / max) * barMaxWidth}
          height={barHeight}
        />
      ) : null}
    </svg>
  );
}

export default BarChart;
