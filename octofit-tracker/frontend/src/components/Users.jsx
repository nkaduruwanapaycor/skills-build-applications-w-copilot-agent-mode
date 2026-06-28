import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchCollection('/users/');
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    void loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user._id} className="list-group-item d-flex justify-content-between">
              <span>{user.username}</span>
              <small className="text-muted">{user.email}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
