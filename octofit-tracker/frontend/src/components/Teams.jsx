import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchCollection('/teams/');
        setTeams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams');
      } finally {
        setLoading(false);
      }
    };

    void loadTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li key={team._id} className="list-group-item">
              <strong>{team.name}</strong>
              <div className="text-muted small">Members: {(team.members || []).join(', ')}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teams;
