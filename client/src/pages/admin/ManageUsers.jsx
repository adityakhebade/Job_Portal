import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Shield, User, Briefcase } from 'lucide-react';
import api from '../../api/axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This will also delete their associated jobs or applications.')) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span style={{ background: '#fef2f2', color: '#b91c1c', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Shield size={12} /> Admin</span>;
      case 'employer':
        return <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={12} /> Employer</span>;
      default:
        return <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><User size={12} /> Seeker</span>;
    }
  };

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading users...</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-light)', textDecoration: 'none' }}>
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1>Manage <span className="gradient-text">Users</span></h1>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Total users: {users.length}</p>
      </div>
      
      {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}
      
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-light)' }}>User</th>
                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-light)' }}>Role</th>
                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-light)' }}>Joined</th>
                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-light)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{user.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {getRoleBadge(user.role)}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(user._id)} 
                      className="btn" 
                      style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.5rem' }}
                      disabled={user.role === 'admin'}
                      title={user.role === 'admin' ? "Cannot delete admin" : "Delete user"}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
