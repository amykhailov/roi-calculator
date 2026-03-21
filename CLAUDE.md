# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ROI Calculator — a Vite + React app for calculating Return on Investment. Supports single-scenario and comparison modes.

## Tech Stack

- **Framework:** React 18 (no TypeScript)
- **Bundler:** Vite 6
- **Charting:** Recharts 2.15
- **Currency:** GBP (£)
- **Brand:** EPAM color scheme

## Status

Core calculator implemented with two modes:
1. **Single mode** (default) — input form on the left, results + chart on the right
2. **Comparison mode** — toggle "Compare two scenarios" for side-by-side evaluation with shared time period, dual result cards, and a combined two-line chart (EPAM blue for Scenario A, EPAM green for Scenario B)

## Architecture

```
src/
├── App.jsx                     — main layout, single/comparison mode state
├── App.css                     — all styles including comparison mode + responsive
├── main.jsx                    — React entry point
├── components/
│   ├── InputForm.jsx           — controlled form (values/onChange props); exports INPUT_DEFAULTS
│   ├── Results.jsx             — results card (label/color props for comparison accent)
│   └── CashFlowChart.jsx       — Recharts line chart (dataA/dataB for two scenarios)
└── utils/
    ├── calculations.js         — calculateROI() and formatPounds() pure functions
    └── validation.js           — validateInputs() and isValid() for real-time form validation
```

## Key Design Decisions

- **InputForm is fully controlled** — parent component owns all form state via `values`/`onChange` props
- **Comparison mode copies A → B** on activation so Scenario B starts with identical values
- **Period is shared** between both scenarios in comparison mode (extracted to a standalone dropdown)
- **Chart merges datasets by array index** — both scenarios share the same period, so array lengths always match
- **EPAM brand colors** — primary blue `#00A9E0`, dark blue `#0B2D71` (headings), green `#39B54A` (Scenario B / positive accents)
- **Real-time validation** — errors derived on every render (no extra state); Calculate button disabled until all fields valid. Rules: investment >= £1,000, revenue > £0, costs >= 0, no empty fields

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
