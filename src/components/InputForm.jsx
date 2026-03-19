import { useState } from 'react';

const PERIOD_OPTIONS = [12, 24, 36];

const DEFAULTS = {
  initialInvestment: 100000,
  monthlyRevenue: 15000,
  monthlyCosts: 5000,
  period: 12,
};

export default function InputForm({ onCalculate }) {
  const [values, setValues] = useState(DEFAULTS);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: Number(e.target.value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(values);
  };

  return (
    <form className="card input-form" onSubmit={handleSubmit}>
      <h2>Investment Details</h2>

      <label>
        <span>Initial Investment (£)</span>
        <input
          type="number"
          min="0"
          value={values.initialInvestment}
          onChange={handleChange('initialInvestment')}
        />
      </label>

      <label>
        <span>Monthly Revenue (£)</span>
        <input
          type="number"
          min="0"
          value={values.monthlyRevenue}
          onChange={handleChange('monthlyRevenue')}
        />
      </label>

      <label>
        <span>Monthly Costs (£)</span>
        <input
          type="number"
          min="0"
          value={values.monthlyCosts}
          onChange={handleChange('monthlyCosts')}
        />
      </label>

      <label>
        <span>Time Period (months)</span>
        <select value={values.period} onChange={handleChange('period')}>
          {PERIOD_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p} months
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Calculate ROI</button>
    </form>
  );
}
