import { formatPounds } from '../utils/calculations';

export default function Results({ results, label, color }) {
  if (!results) return null;

  const { roiPercent, paybackPeriod, totalNetProfit, monthlyNetProfit } = results;

  const paybackDisplay =
    paybackPeriod === 'Never' ? 'Never' : `${paybackPeriod} months`;

  const style = color ? { borderLeft: `4px solid ${color}` } : undefined;

  return (
    <div className="card results" style={style}>
      <h2>Results</h2>
      {label && <p className="results-subtitle">{label}</p>}
      <div className="results-grid">
        <div className="result-item">
          <span className="result-label">ROI</span>
          <span className={`result-value ${roiPercent >= 0 ? 'positive' : 'negative'}`}>
            {roiPercent}%
          </span>
        </div>
        <div className="result-item">
          <span className="result-label">Payback Period</span>
          <span className="result-value">{paybackDisplay}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Total Net Profit</span>
          <span className={`result-value ${totalNetProfit >= 0 ? 'positive' : 'negative'}`}>
            {formatPounds(totalNetProfit)}
          </span>
        </div>
        <div className="result-item">
          <span className="result-label">Monthly Net Profit</span>
          <span className={`result-value ${monthlyNetProfit >= 0 ? 'positive' : 'negative'}`}>
            {formatPounds(monthlyNetProfit)}
          </span>
        </div>
      </div>
    </div>
  );
}
