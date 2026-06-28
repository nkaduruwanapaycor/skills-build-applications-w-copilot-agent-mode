import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl } from './utils/api';
import './App.css';

function App() {
  const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim();
  const usingFallback = !codespaceName;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-wrap">
          <img src="/octofitapp-small.png" alt="Octofit logo" className="brand-logo" />
          <div>
            <h1 className="brand-title">OctoFit Tracker</h1>
            <p className="brand-subtitle">React 19 presentation tier with routed API views</p>
          </div>
        </div>
        <p className="api-note">
          API base: <code>{apiBaseUrl}</code>
        </p>
        {usingFallback ? (
          <p className="env-warning">
            VITE_CODESPACE_NAME is not set. Using localhost fallback. Define it in
            <code>.env.local</code> when running in Codespaces.
          </p>
        ) : null}
      </header>

      <nav className="main-nav" aria-label="Primary">
        <Link to="/users">Users</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/workouts">Workouts</Link>
      </nav>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
