const PERIOD_OPTIONS = [12, 24, 36];

export const INPUT_DEFAULTS = {
  initialInvestment: 100000,
  monthlyRevenue: 15000,
  monthlyCosts: 5000,
};

export default function InputForm({
  values,
  onChange,
  onCalculate,
  label = 'Investment Details',
  showPeriod = true,
  showButton = true,
  period,
  onPeriodChange,
  errors = {},
  disabled = false,
}) {
  const handleChange = (field) => (e) => {
    const raw = e.target.value;
    onChange({ ...values, [field]: raw === '' ? '' : Number(raw) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCalculate) onCalculate();
  };

  return (
    <form className="card input-form" onSubmit={handleSubmit}>
      <h2>{label}</h2>

      <label>
        <span>Initial Investment (£)</span>
        <input
          type="number"
          min="0"
          value={values.initialInvestment}
          onChange={handleChange('initialInvestment')}
          className={errors.initialInvestment ? 'input-error' : ''}
        />
        {errors.initialInvestment && (
          <span className="error-message">{errors.initialInvestment}</span>
        )}
      </label>

      <label>
        <span>Monthly Revenue (£)</span>
        <input
          type="number"
          min="0"
          value={values.monthlyRevenue}
          onChange={handleChange('monthlyRevenue')}
          className={errors.monthlyRevenue ? 'input-error' : ''}
        />
        {errors.monthlyRevenue && (
          <span className="error-message">{errors.monthlyRevenue}</span>
        )}
      </label>

      <label>
        <span>Monthly Costs (£)</span>
        <input
          type="number"
          min="0"
          value={values.monthlyCosts}
          onChange={handleChange('monthlyCosts')}
          className={errors.monthlyCosts ? 'input-error' : ''}
        />
        {errors.monthlyCosts && (
          <span className="error-message">{errors.monthlyCosts}</span>
        )}
      </label>

      {showPeriod && (
        <label>
          <span>Time Period (months)</span>
          <select
            value={period !== undefined ? period : values.period}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (onPeriodChange) onPeriodChange(val);
              else onChange({ ...values, period: val });
            }}
          >
            {PERIOD_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p} months
              </option>
            ))}
          </select>
        </label>
      )}

      {showButton && (
        <button type="submit" disabled={disabled}>
          Calculate ROI
        </button>
      )}
    </form>
  );
}
