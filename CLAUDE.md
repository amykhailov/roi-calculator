# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ROI Calculator — a Vite + React app for calculating Return on Investment. Supports single-scenario and comparison modes.

## Status

Core calculator implemented with comparison mode. Users can toggle "Compare two scenarios" to evaluate two investment scenarios side by side with a shared time period, side-by-side result cards, and a combined chart.

## Architecture

- `src/App.jsx` — main layout, comparison mode state management
- `src/components/InputForm.jsx` — controlled form component (accepts `values`/`onChange` props)
- `src/components/Results.jsx` — results card (supports `label`/`color` props for comparison mode)
- `src/components/CashFlowChart.jsx` — Recharts line chart (supports `dataA`/`dataB` for two scenarios)
- `src/utils/calculations.js` — `calculateROI()` and `formatPounds()` utilities

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
