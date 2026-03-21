export function validateInputs(values) {
  const errors = { initialInvestment: null, monthlyRevenue: null, monthlyCosts: null };

  const inv = values.initialInvestment;
  if (inv === '' || inv === undefined || inv === null) {
    errors.initialInvestment = 'Required';
  } else if (inv < 1000) {
    errors.initialInvestment = 'Must be at least £1,000';
  }

  const rev = values.monthlyRevenue;
  if (rev === '' || rev === undefined || rev === null) {
    errors.monthlyRevenue = 'Required';
  } else if (rev <= 0) {
    errors.monthlyRevenue = 'Must be greater than £0';
  }

  const costs = values.monthlyCosts;
  if (costs === '' || costs === undefined || costs === null) {
    errors.monthlyCosts = 'Required';
  } else if (costs < 0) {
    errors.monthlyCosts = 'Must be zero or positive';
  }

  return errors;
}

export function isValid(errors) {
  return Object.values(errors).every((v) => v === null);
}
