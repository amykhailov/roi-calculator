import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatPounds } from '../utils/calculations';

export default function CashFlowChart({
  dataA,
  dataB,
  labelA = 'Scenario A',
  labelB = 'Scenario B',
}) {
  if (!dataA || dataA.length === 0) return null;

  const hasTwoLines = dataB && dataB.length > 0;

  // Merge both datasets by month index
  const chartData = dataA.map((item, i) => {
    const point = { month: item.month, cashFlowA: item.cumulativeCashFlow };
    if (hasTwoLines && dataB[i]) {
      point.cashFlowB = dataB[i].cumulativeCashFlow;
    }
    return point;
  });

  return (
    <div className="card chart-container">
      <h2>Cumulative Cash Flow</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            label={{ value: 'Month', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis
            tickFormatter={(v) => formatPounds(v)}
            width={90}
          />
          <Tooltip
            formatter={(value, name) => {
              const displayName = name === 'cashFlowA' ? labelA : labelB;
              return [formatPounds(value), displayName];
            }}
            labelFormatter={(label) => `Month ${label}`}
          />
          <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="6 4" label="Break-even" />
          <Line
            type="monotone"
            dataKey="cashFlowA"
            name="cashFlowA"
            stroke="#00A9E0"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: '#00A9E0' }}
          />
          {hasTwoLines && (
            <Line
              type="monotone"
              dataKey="cashFlowB"
              name="cashFlowB"
              stroke="#39B54A"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, fill: '#39B54A' }}
            />
          )}
          {hasTwoLines && (
            <Legend
              formatter={(value) => (value === 'cashFlowA' ? labelA : labelB)}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
