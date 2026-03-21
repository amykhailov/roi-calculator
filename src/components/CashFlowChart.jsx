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
  colorA = '#00A9E0',
  colorB = '#39B54A',
  theme = 'light',
}) {
  if (!dataA || dataA.length === 0) return null;

  const hasTwoLines = dataB && dataB.length > 0;
  const isDark = theme === 'dark';

  // Theme-derived colors for chart elements
  const gridColor = isDark ? '#2d3a4d' : '#e5e7eb';
  const axisTickColor = isDark ? '#9ca3af' : '#6b7280';
  const refLineColor = isDark ? '#6b7280' : '#9ca3af';
  const refLabelColor = isDark ? '#9ca3af' : '#6b7280';
  const tooltipBg = isDark ? '#1a2332' : '#fff';
  const tooltipBorder = isDark ? '#2d3a4d' : '#e5e7eb';
  const tooltipText = isDark ? '#e5e7eb' : '#1f2937';
  const legendColor = isDark ? '#e5e7eb' : '#1f2937';

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
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            label={{ value: 'Month', position: 'insideBottomRight', offset: -5, fill: axisTickColor }}
            tick={{ fill: axisTickColor }}
          />
          <YAxis
            tickFormatter={(v) => formatPounds(v)}
            width={90}
            tick={{ fill: axisTickColor }}
          />
          <Tooltip
            formatter={(value, name) => {
              const displayName = name === 'cashFlowA' ? labelA : labelB;
              return [formatPounds(value), displayName];
            }}
            labelFormatter={(label) => `Month ${label}`}
            contentStyle={{
              background: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: '8px',
              color: tooltipText,
            }}
            labelStyle={{ color: tooltipText }}
            itemStyle={{ color: tooltipText }}
          />
          <ReferenceLine
            y={0}
            stroke={refLineColor}
            strokeDasharray="6 4"
            label={{ value: 'Break-even', fill: refLabelColor, position: 'right' }}
          />
          <Line
            type="monotone"
            dataKey="cashFlowA"
            name="cashFlowA"
            stroke={colorA}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: colorA }}
          />
          {hasTwoLines && (
            <Line
              type="monotone"
              dataKey="cashFlowB"
              name="cashFlowB"
              stroke={colorB}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, fill: colorB }}
            />
          )}
          {hasTwoLines && (
            <Legend
              formatter={(value) => (value === 'cashFlowA' ? labelA : labelB)}
              wrapperStyle={{ color: legendColor }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
