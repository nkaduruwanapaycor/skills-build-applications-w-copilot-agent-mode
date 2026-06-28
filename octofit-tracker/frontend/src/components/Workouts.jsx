import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('/workouts/');
        setWorkouts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts');
      } finally {
        setLoading(false);
      }
    };

    void loadWorkouts();
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li key={workout._id} className="list-group-item">
              <strong>{workout.name}</strong>
              <p className="mb-1">{workout.description}</p>
              <div className="small text-muted">Duration: {workout.duration} min</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Workouts;
