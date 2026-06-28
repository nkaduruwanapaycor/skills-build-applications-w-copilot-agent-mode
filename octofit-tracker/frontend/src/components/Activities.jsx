import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchCollection('/activities/');
        setActivities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    };

    void loadActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li key={activity._id} className="list-group-item">
              <strong>{activity.username}</strong> logged {activity.activity_type} for {activity.duration} min
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
