import { useState } from 'react';
import { calculateROI } from './utils/calculations';
import InputForm from './components/InputForm';
import Results from './components/Results';
import CashFlowChart from './components/CashFlowChart';
import './App.css';

function App() {
  const [results, setResults] = useState(null);

  const handleCalculate = (values) => {
    setResults(calculateROI(values));
  };

  return (
    <div className="app">
      <header>
        <h1>ROI Calculator</h1>
        <p>Calculate your Return on Investment</p>
      </header>

      <main className="layout">
        <div className="left-column">
          <InputForm onCalculate={handleCalculate} />
        </div>
        <div className="right-column">
          {results ? (
            <>
              <Results results={results} />
              <CashFlowChart data={results.cashFlowData} />
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

export default App;
