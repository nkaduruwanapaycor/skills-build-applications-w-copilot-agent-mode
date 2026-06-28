import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchCollection('/leaderboard/');
        setEntries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    void loadLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        <ol className="list-group list-group-numbered">
          {entries.map((entry) => (
            <li key={entry._id} className="list-group-item d-flex justify-content-between">
              <span>{entry.username}</span>
              <strong>{entry.score}</strong>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Leaderboard;
