export function calculateROI({ initialInvestment, monthlyRevenue, monthlyCosts, period }) {
  const monthlyNetProfit = monthlyRevenue - monthlyCosts;
  const totalNetProfit = monthlyNetProfit * period - initialInvestment;
  const roiPercent = ((totalNetProfit / initialInvestment) * 100).toFixed(1);

  let paybackPeriod;
  if (monthlyNetProfit <= 0) {
    paybackPeriod = 'Never';
  } else {
    paybackPeriod = Math.ceil(initialInvestment / monthlyNetProfit);
  }

  const cashFlowData = [];
  for (let month = 0; month <= period; month++) {
    cashFlowData.push({
      month,
      cumulativeCashFlow: monthlyNetProfit * month - initialInvestment,
    });
  }

  return {
    monthlyNetProfit,
    totalNetProfit,
    roiPercent: Number(roiPercent),
    paybackPeriod,
    cashFlowData,
  };
}

export function formatPounds(value) {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return value < 0 ? `-£${formatted}` : `£${formatted}`;
}
