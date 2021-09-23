import { Typography } from '@material-ui/core';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import notEmpty from '../../util/notEmpty';
import { AccuracyData, Columns } from './getAccuracyData';

function range(start: number, end: number): number[] {
  if (start > end) {
    throw new Error('start value is larger than end value.');
  }
  const arr: number[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

const X_DOMAIN = [0, 10];
const X_TICKS = range(1, 9);

interface RefineAdjustmentsChartProps {
  data: AccuracyData[];
}
function RefineAdjustmentsChart({
  data,
}: RefineAdjustmentsChartProps): JSX.Element {
  const chartData = data.map(d => ({
    ...d,
    [Columns.PRIVACY_COST]: Number(d[Columns.PRIVACY_COST]),
  }));

  let maxVal = 0;
  data.forEach(d => {
    [d['10'], d['90'], d[Columns.PRIVACY_ERROR]].forEach(n => {
      if (notEmpty(n)) {
        if (n > maxVal) {
          maxVal = n;
        }
      }
    });
  });
  const maxValStr = Math.round(maxVal).toLocaleString();
  const yAxisMargin = (maxValStr.length + 1) * 9;

  return (
    <div>
      <Typography align="center">
        <strong>Privacy Error vs. Privacy Cost</strong>
      </Typography>
      <ResponsiveContainer width="100%" height={325}>
        <LineChart data={chartData} margin={{ bottom: 20 }}>
          <XAxis
            dataKey={Columns.PRIVACY_COST}
            domain={X_DOMAIN}
            ticks={X_TICKS}
            tickLine={false}
            type="number"
            label={{
              value: Columns.PRIVACY_COST,
              position: 'bottom',
              offset: 0,
            }}
          />
          <YAxis
            tickFormatter={n =>
              typeof n === 'number' ? n.toLocaleString() : n
            }
            tickLine={false}
            type="number"
            label={{
              value: Columns.PRIVACY_ERROR,
              angle: -90,
              position: 'insideLeft',
              style: {
                textAnchor: 'middle',
              },
            }}
            width={yAxisMargin}
          />
          <Line
            type="monotone"
            dataKey={'10'}
            stroke="#16d2b0"
            dot={false}
            connectNulls={true}
          />
          <Line
            type="monotone"
            dataKey={'90'}
            stroke="#1638d2"
            dot={false}
            connectNulls={true}
          />
          <Line
            type="monotone"
            dataKey={Columns.PRIVACY_ERROR}
            stroke="#1696d2"
            dot={false}
            connectNulls={true}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RefineAdjustmentsChart;
