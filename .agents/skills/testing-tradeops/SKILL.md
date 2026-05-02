---
name: testing-tradeops
description: >
  Test the TradeOps trading dashboard
  end-to-end. Use when verifying UI,
  API, or styling changes.
---

# Testing TradeOps

## Local Dev Setup

1. Start the Flask backend:
   ```
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
   Backend runs on http://localhost:5000

2. Start the Vite dev server:
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on http://localhost:5173
   with API proxy to :5000.

3. Verify health:
   ```
   curl http://localhost:5000/api/health
   ```
   Should return `{"status": "healthy"}`.

## Key E2E Test Flows

### 1. Dashboard Load
- Navigate to http://localhost:5173
- Verify header shows "TradeOps" and
  health badge shows "System Healthy"
- Summary cards: Total=10, Filled=5,
  Pending=4, Cancelled=1
- Table has 10 rows with US equity
  tickers (AAPL, TSLA, MSFT, etc.)
- Check theme: currently professional
  light theme (white cards, light gray
  background, navy accents). Theme may
  change — verify CSS variables in
  `frontend/src/index.css` for current
  palette.

### 2. Create Trade (CRUD Round-Trip)
- Click "+ New Trade" in header
- Modal should match current theme
- Fill all fields: Counterparty, Asset,
  Direction, Quantity, Price, Status
- Submit button should be disabled
  until Counterparty and Asset are
  filled
- After submit: modal closes, table
  row count increments by 1, summary
  cards update accordingly

### 3. Trade Detail Modal
- Click any table row
- Modal shows all trade fields plus
  computed Notional Value (qty * price)
- Verify the math is correct
- Close button dismisses modal

## Architecture Notes

- All styling uses CSS variables
  defined in `frontend/src/index.css`.
  Theme changes only require updating
  the `:root` variables.
- Backend stores trades in-memory.
  Restarting Flask resets to the 10
  sample trades.
- Vite proxy config is in
  `frontend/vite.config.js` — proxies
  `/api` to `http://localhost:5000`.
- The `npm run build` command produces
  static files in `frontend/dist/`.

## Common Issues

- If the frontend shows empty data,
  check that Flask is running on :5000
  and the Vite proxy is configured.
- If modals appear with wrong theme
  colors, check for hardcoded color
  values in component CSS files
  (Modal.css, Dashboard.css) that
  might override CSS variables.
- Sample trade tickers should all be
  US equities. If crypto tickers
  appear, update `backend/app.py`
  sample data.

## Devin Secrets Needed

None — this app runs entirely locally
with no external auth or API keys.
