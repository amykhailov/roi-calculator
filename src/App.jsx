import { useState } from 'react';
import { calculateROI } from './utils/calculations';
import InputForm, { INPUT_DEFAULTS } from './components/InputForm';
import Results from './components/Results';
import CashFlowChart from './components/CashFlowChart';
import './App.css';

const COLOR_A = '#f59e0b';
const COLOR_B = '#0ea5e9';

function App() {
  const [compareMode, setCompareMode] = useState(false);
  const [valuesA, setValuesA] = useState({ ...INPUT_DEFAULTS, period: 12 });
  const [valuesB, setValuesB] = useState({ ...INPUT_DEFAULTS, period: 12 });
  const [sharedPeriod, setSharedPeriod] = useState(12);
  const [results, setResults] = useState(null);

  const handleToggleCompare = () => {
    if (!compareMode) {
      // Turning on: copy A into B, extract period to shared
      setValuesB({ ...valuesA });
      setSharedPeriod(valuesA.period || 12);
    }
    setResults(null);
    setCompareMode(!compareMode);
  };

  const handleCalculate = () => {
    if (compareMode) {
      const a = calculateROI({ ...valuesA, period: sharedPeriod });
      const b = calculateROI({ ...valuesB, period: sharedPeriod });
      setResults({ a, b });
    } else {
      const a = calculateROI(valuesA);
      setResults({ a });
    }
  };

  const handleSingleCalculate = () => {
    const a = calculateROI(valuesA);
    setResults({ a });
  };

  // Single mode
  if (!compareMode) {
    return (
      <div className="app">
        <header>
          <h1>ROI Calculator</h1>
          <p>Calculate your Return on Investment</p>
        </header>

        <div className="compare-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={compareMode}
              onChange={handleToggleCompare}
            />
            <span className="toggle-switch" />
            Compare two scenarios
          </label>
        </div>

        <main className="layout">
          <div className="left-column">
            <InputForm
              values={valuesA}
              onChange={setValuesA}
              onCalculate={handleSingleCalculate}
            />
          </div>
          <div className="right-column">
            {results ? (
              <>
                <Results results={results.a} />
                <CashFlowChart dataA={results.a.cashFlowData} />
              </>
            ) : (
              <div className="card placeholder">
                <p>Enter your investment details and click <strong>Calculate ROI</strong> to see results.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Comparison mode
  return (
    <div className="app">
      <header>
        <h1>ROI Calculator</h1>
        <p>Calculate your Return on Investment</p>
      </header>

      <div className="compare-toggle">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={compareMode}
            onChange={handleToggleCompare}
          />
          <span className="toggle-switch" />
          Compare two scenarios
        </label>
      </div>

      <main className="layout-compare">
        <div className="shared-period">
          <label>
            <span>Time Period (months)</span>
            <select value={sharedPeriod} onChange={(e) => setSharedPeriod(Number(e.target.value))}>
              <option value={12}>12 months</option>
              <option value={24}>24 months</option>
              <option value={36}>36 months</option>
            </select>
          </label>
        </div>

        <div className="forms-row">
          <InputForm
            values={valuesA}
            onChange={setValuesA}
            label="Scenario A"
            showPeriod={false}
            showButton={false}
          />
          <InputForm
            values={valuesB}
            onChange={setValuesB}
            label="Scenario B"
            showPeriod={false}
            showButton={false}
          />
        </div>

        <button className="calculate-btn" onClick={handleCalculate}>
          Calculate ROI
        </button>

        {results && (
          <>
            <div className="results-row">
              <Results results={results.a} label="Scenario A" color={COLOR_A} />
              <Results results={results.b} label="Scenario B" color={COLOR_B} />
            </div>
            <CashFlowChart
              dataA={results.a.cashFlowData}
              dataB={results.b.cashFlowData}
              labelA="Scenario A"
              labelB="Scenario B"
            />
          </>
        )}

        {!results && (
          <div className="card placeholder">
            <p>Configure both scenarios and click <strong>Calculate ROI</strong> to compare results.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
