import { formatPounds } from '../utils/calculations';

function findBreakevenMonth(cashFlowData) {
  for (let i = 1; i < cashFlowData.length; i++) {
    if (cashFlowData[i].cumulativeCashFlow >= 0) return i;
  }
  return -1;
}

export default function MonthlyBreakdown({ valuesA, valuesB, resultsA, resultsB }) {
  if (!resultsA) return null;

  const isComparison = !!resultsB;
  const period = resultsA.cashFlowData.length - 1; // exclude month 0

  const breakevenA = findBreakevenMonth(resultsA.cashFlowData);
  const breakevenB = isComparison ? findBreakevenMonth(resultsB.cashFlowData) : -1;

  const revenueA = Number(valuesA.monthlyRevenue);
  const costsA = Number(valuesA.monthlyCosts);
  const revenueB = isComparison ? Number(valuesB.monthlyRevenue) : 0;
  const costsB = isComparison ? Number(valuesB.monthlyCosts) : 0;

  const rows = [];
  for (let m = 1; m <= period; m++) {
    const netA = revenueA - costsA;
    const cumA = resultsA.cashFlowData[m].cumulativeCashFlow;

    const isBreakevenA = m === breakevenA;
    const isBreakevenB = m === breakevenB;
    const isBreakeven = isBreakevenA || isBreakevenB;

    let breakevenLabel = '';
    if (isComparison && isBreakevenA && isBreakevenB) {
      breakevenLabel = ' (A & B)';
    } else if (isComparison && isBreakevenA) {
      breakevenLabel = ' (A)';
    } else if (isComparison && isBreakevenB) {
      breakevenLabel = ' (B)';
    }

    const row = {
      month: m,
      revenueA: revenueA,
      costsA: costsA,
      netA,
      cumA,
      isBreakeven,
      breakevenLabel,
    };

    if (isComparison) {
      const netB = revenueB - costsB;
      const cumB = resultsB.cashFlowData[m].cumulativeCashFlow;
      row.revenueB = revenueB;
      row.costsB = costsB;
      row.netB = netB;
      row.cumB = cumB;
    }

    rows.push(row);
  }

  if (isComparison) {
    return (
      <div className="card breakdown-table-wrapper">
        <h2>Monthly Breakdown</h2>
        <div className="table-scroll">
          <table className="breakdown-table">
            <thead>
              <tr>
                <th rowSpan={2}>Month</th>
                <th colSpan={4} className="scenario-header-a">Scenario A</th>
                <th colSpan={4} className="scenario-header-b">Scenario B</th>
              </tr>
              <tr>
                <th>Revenue</th>
                <th>Costs</th>
                <th>Net Profit</th>
                <th>Cum. CF</th>
                <th>Revenue</th>
                <th>Costs</th>
                <th>Net Profit</th>
                <th>Cum. CF</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.month} className={r.isBreakeven ? 'breakeven-row' : ''}>
                  <td>{r.month}{r.breakevenLabel}</td>
                  <td>{formatPounds(r.revenueA)}</td>
                  <td>{formatPounds(r.costsA)}</td>
                  <td>{formatPounds(r.netA)}</td>
                  <td>{formatPounds(r.cumA)}</td>
                  <td>{formatPounds(r.revenueB)}</td>
                  <td>{formatPounds(r.costsB)}</td>
                  <td>{formatPounds(r.netB)}</td>
                  <td>{formatPounds(r.cumB)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="card breakdown-table-wrapper">
      <h2>Monthly Breakdown</h2>
      <div className="table-scroll">
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Monthly Revenue</th>
              <th>Monthly Costs</th>
              <th>Net Profit</th>
              <th>Cumulative Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.month} className={r.isBreakeven ? 'breakeven-row' : ''}>
                <td>{r.month}</td>
                <td>{formatPounds(r.revenueA)}</td>
                <td>{formatPounds(r.costsA)}</td>
                <td>{formatPounds(r.netA)}</td>
                <td>{formatPounds(r.cumA)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
