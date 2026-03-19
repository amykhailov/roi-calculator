import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { formatPounds } from '../utils/calculations';

export default function CashFlowChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="card chart-container">
      <h2>Cumulative Cash Flow</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
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
            formatter={(value) => [formatPounds(value), 'Cash Flow']}
            labelFormatter={(label) => `Month ${label}`}
          />
          <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="6 4" label="Break-even" />
          <Line
            type="monotone"
            dataKey="cumulativeCashFlow"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: '#f59e0b' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
