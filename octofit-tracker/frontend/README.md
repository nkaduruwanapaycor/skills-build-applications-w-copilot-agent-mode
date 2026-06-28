# OctoFit Frontend

React 19 + Vite presentation tier for OctoFit Tracker.

## Environment setup

Define `VITE_CODESPACE_NAME` when running in Codespaces so API requests resolve to:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/...`

Create `octofit-tracker/frontend/.env.local` and add:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

`http://localhost:8000/api/...`

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
